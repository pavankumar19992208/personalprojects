# 🤖 Build Your First AI Agent

Let's build a simple but powerful **Research Assistant**. This agent will use a search tool to find real-time information on the web to answer a question.

---

## ✅ What You'll Accomplish

- Define an agent with a specific `role`, `goal`, and `backstory`.
- Equip the agent with a `SearchTool`.
- Create a `Task` for the agent to perform.
- Assemble and run a `Crew` to get a result.

---

## 🧰 Section 1: Define Your Agent

Each agent in the NeuraLife ADK is defined by its personality and capabilities.

1.  **Create a Python file:** Name it `my_first_agent.py`.
2.  **Write the code:**

```python
from neuralife_adk.agents import Agent
from neuralife_adk.tools import SearchTool
from neuralife_adk.llms import OpenAI

# 1. Initialize the LLM you want to use (e.g., OpenAI's GPT-4)
llm = OpenAI(model="gpt-4-turbo")

# 2. Define your agent
# This agent is equipped with a tool to search the web.
research_agent = Agent(
    role='Expert Research Analyst',
    goal='Find the most relevant and up-to-date information on any given topic.',
    backstory=(
        'You are a world-class researcher, known for your ability to '
        'sift through noise and deliver concise, accurate insights.'
    ),
    tools=[SearchTool()],
    llm=llm,
    verbose=True
)

print("✅ Research Agent defined.")
```

> **💡 Key Concepts:**
>
> - **Role**: The agent's job title (e.g., 'Programmer').
> - **Goal**: The agent's primary objective.
> - **Backstory**: The agent's personality and history, which influences its tone.
> - **Tools**: The external functions the agent can use.

---

## ⚙️ Section 2: Create and Run the Crew

A `Crew` is responsible for orchestrating the work between one or more agents.

1.  **Define the Task:** Tell the agent what to do.
2.  **Assemble the Crew:** Assign the agent and the task to a crew.
3.  **Kickoff:** Start the work.

Add this code to the bottom of `my_first_agent.py`:

```python
from neuralife_adk.crew import Crew, Task

# 3. Define the task for your agent
research_task = Task(
    description='What are the latest trends in Agentic AI for 2025?',
    agent=research_agent
)

# 4. Assemble your one-agent crew
research_crew = Crew(
    agents=[research_agent],
    tasks=[research_task]
)

# 5. Kick off the task and get the result!
print("\n🚀 Crew: Kicking off research task...")
result = research_crew.kickoff()

print("\n\n✅ --- Final Result ---")
print(result)
```

---

## 🏁 Section 3: Run Your Agent

Execute the script from your terminal:

```bash
python my_first_agent.py
```

Because `verbose=True` is set, you will see the agent's entire thought process in the console before it prints the final, synthesized answer.

**Congratulations! You've successfully built and run your first intelligent agent.** This simple "Agent + Task + Crew" pattern is the foundation for building far more complex, multi-agent systems.

**📚 Next: [Multi-Agent Systems](./multi-agent) →**
