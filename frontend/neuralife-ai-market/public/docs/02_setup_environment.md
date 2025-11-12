# ⚙️ Setting Up Your Local Development Environment

Welcome, developer!
Before building your first **Agentic AI** system, let’s configure your local environment so you can develop, run, and deploy AI agents independently — outside Kaggle.

This guide will help you:
✅ Install the Google Agent Development Kit (ADK)
✅ Configure Gemini API access
✅ Verify setup with a simple test agent

---

## 🧩 Step 1: Prerequisites

Before you begin, ensure your system has:

| Requirement                                | Recommended Version     |
| :----------------------------------------- | :---------------------- |
| 🐍 Python                                  | 3.10 or higher          |
| 🧱 Node.js (optional, for web integration) | 18+                     |
| 🧰 Git                                     | Latest stable           |
| 💻 IDE                                     | VS Code / PyCharm       |
| 🌐 Internet Access                         | For Gemini API requests |

---

## 📦 Step 2: Create and Activate a Virtual Environment

It’s best practice to isolate dependencies for each project.

```bash
# Create a new project directory
mkdir ai-agent-lab && cd ai-agent-lab

# Create a virtual environment
python -m venv venv

# Activate it
# On Windows
venv\Scripts\activate

# On macOS / Linux
source venv/bin/activate
```

---

## 🧠 Step 3: Install Required Libraries

The two main libraries you’ll need are:

- `google-adk` → The core Agent Development Kit.
- `google-generativeai` → The official SDK for the Gemini family of models.

Install both using pip:

```bash
pip install google-adk google-generativeai
```

**✅ Success Check:**
Once installed, run `pip show google-adk`. If you see version details, your installation worked.

---

## 🔑 Step 4: Configure Your Gemini API Key

Every request to Gemini requires authentication via an API key.

### 1️⃣ Create an API Key

Visit **[Google AI Studio](https://aistudio.google.com/app/apikey)** and click “Create API Key”. Copy the key and keep it private.

### 2️⃣ Store Your Key Locally

You can set it as an environment variable or use a `.env` file.

**Option 1 — Environment Variable (Recommended for Production)**

```bash
# On macOS / Linux
export GOOGLE_API_KEY="your-api-key-here"

# On Windows (PowerShell)
$env:GOOGLE_API_KEY="your-api-key-here"
```

**Option 2 — `.env` File (Great for Development)**
Create a file named `.env` in your project root:

```
GOOGLE_API_KEY="your-api-key-here"
```

You will also need to install `python-dotenv` (`pip install python-dotenv`) to load it.

---

## 🧱 Step 5: Verify Installation

Let’s confirm your setup with a minimal script. Create a new file `verify_setup.py`:

```python
import os
from google.generativeai.client import get_api_key
from google.adk.models.google_llm import Gemini

# This checks if the key is set as an environment variable
if get_api_key() is None:
    print("❌ GOOGLE_API_KEY environment variable not set.")
else:
    print("✅ Gemini API key found.")

    # Initialize Gemini model
    model = Gemini(model="gemini-1.5-flash-latest")

    # Simple test prompt
    prompt = "Hello Gemini! Are you ready to build agents?"
    response = model.generate(prompt)

    print("\nGemini Response:")
    print(response.text)
```

Run it from your terminal: `python verify_setup.py`. You should see a success message and a response from Gemini.

---

## ⚙️ Step 6: Optional Developer Utilities

To make development smoother, install these tools:

| Tool            | Purpose                         | Install Command             |
| :-------------- | :------------------------------ | :-------------------------- |
| `python-dotenv` | Load `.env` files automatically | `pip install python-dotenv` |
| `jupyterlab`    | Interactive code testing        | `pip install jupyterlab`    |
| `black`         | Auto-format code                | `pip install black`         |

---

## 🔬 Step 7: Test ADK Imports

Run this quick script to confirm the ADK package is ready:

```python
from google.adk.agents import Agent
from google.adk.models.google_llm import Gemini
from google.adk.runners import InMemoryRunner
from google.adk.tools import google_search

print("✅ ADK components imported successfully.")
```

If it prints the success message, your environment is fully configured!

---

## 🚀 Summary

| Step | Task                            |
| :--- | :------------------------------ |
| 1️⃣   | Install Python, Node.js, Git    |
| 2️⃣   | Create virtual environment      |
| 3️⃣   | Install ADK and Gemini SDK      |
| 4️⃣   | Configure Gemini API key        |
| 5️⃣   | Verify setup with a test script |

<br>

**✅ Next Step:** Now that your environment is configured, move on to the next section to build your first intelligent agent.

**� Next: [Build Your First AI Agent](./first-agent) →**
