import os
import re
import json
import requests
import vertexai
from vertexai.generative_models import GenerativeModel, GenerationConfig

# --- Vertex AI Initialization ---
try:
    # IMPORTANT: Replace with your Google Cloud project ID and location
    PROJECT_ID = "innate-booking-465311-a6"
    LOCATION = "global"# e.g., "us-central1"
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    
    # Configure the model
    generation_config = GenerationConfig(
        temperature=0.2,
        top_p=0.95,
        max_output_tokens=8192,
    )
    model = GenerativeModel("gemini-2.5-flash", generation_config=generation_config)
    print("Vertex AI initialized successfully.")
except Exception as e:
    print(f"ERROR: Could not initialize Vertex AI. LLM features will be disabled. Error: {e}")
    model = None
# --- End Vertex AI Initialization ---

def get_package_docs(pkg_name: str) -> str:
    """
    Fetches package README from jsDelivr CDN to provide context to the LLM.
    """
    try:
        url = f"https://cdn.jsdelivr.net/npm/{pkg_name}/README.md"
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            # Return the first 4000 characters to avoid an overly long prompt
            return resp.text[:4000]
        return "Could not retrieve README.md for this package."
    except requests.RequestException as e:
        return f"Could not retrieve documentation due to an error: {e}"

def construct_refactor_prompt(file_path: str, file_content: str, package: dict, package_docs: str) -> str:
    """
    Constructs a detailed prompt for the LLM to perform a version upgrade.
    """
    lang = "javascript"
    if file_path.endswith(".jsx"): lang = "jsx"
    elif file_path.endswith(".ts"): lang = "typescript"
    elif file_path.endswith(".tsx"): lang = "tsx"

    return f"""
You are an expert AI programmer specializing in React and Node.js package migrations. Your task is to refactor a single file to upgrade a specific package, based on the provided documentation.

**Package to Upgrade:**
- Name: `{package['name']}`
- From Version: `{package['current']}`
- To Version: `{package['latest']}`

**Package README/Documentation (for context on breaking changes):**
```
{package_docs}
```

**File to Refactor:** `{os.path.basename(file_path)}`

**Instructions:**
1.  Analyze the original code to identify any usage of the deprecated package (`{package['name']}`). This includes imports, function calls, and component usage.
2.  Consult the provided documentation to understand the breaking changes between the old and new versions.
3.  Apply only the necessary code changes to make the file compatible with the new version (`{package['latest']}`).
4.  Preserve the original code style, formatting, and all existing logic that is unrelated to the package upgrade.
5.  Do NOT add, remove, or modify any functionality. This is a pure version upgrade.
6.  If the file does not use the package, or if no changes are needed, return the original code.
7.  Return the complete, refactored code for the file inside a single markdown code block. Do not add any explanation or commentary outside of the code block.

**Original Code:**
```{lang}
{file_content}
```
"""

def parse_llm_response(response_text: str) -> str | None:
    """Extracts code from a markdown code block."""
    match = re.search(r"```(?:javascript|typescript|jsx|tsx)?\n(.*?)\n```", response_text, re.DOTALL)
    if match:
        return match.group(1).strip()
    # Fallback for responses that might just be raw code
    if not response_text.strip().startswith("```"):
        return response_text.strip()
    return None

async def call_llm_for_refactor(prompt: str, original_content: str) -> str:
    """Calls the Gemini model and returns the refactored code."""
    if not model:
        print("WARNING: Vertex AI model not initialized. Skipping refactor.")
        return original_content

    try:
        print(f"--- SENDING PROMPT TO LLM (size: {len(prompt)}) ---")
        response = await model.generate_content_async(prompt)
        print("--- RECEIVED RESPONSE FROM LLM ---")
        
        refactored_code = parse_llm_response(response.text)
        
        if refactored_code:
            return refactored_code
        else:
            print("WARNING: Could not parse LLM response. Returning original content.")
            return original_content
            
    except Exception as e:
        print(f"ERROR: Error calling LLM: {e}")
        return original_content