# Claude Code Instructions - Quick Reference

**Repository:** https://github.com/srourslaw/Enterprise_Architecture_Assessment
**Vercel:** https://enterprise-architecture-assessment.vercel.app/
**Project:** Enterprise Architecture Assessment Dashboard (Consultant tool to assess client technology landscapes, identify gaps, and recommend solutions)

---

## 🎯 Core Principle: GitHub as Persistent Memory

Use this GitHub repository as your **single source of truth** and persistent memory. Always:
- Read commit history to understand what changed, why, and when
- Use `git log`, `git diff`, and branch comparisons to track evolution
- Identify and reuse established patterns (coding, architecture, testing)
- Compare broken code to working implementations from earlier commits
- Follow the same structure for new integrations
- Commit after each successful checkpoint with clear, descriptive messages
- Create feature branches for major phases; merge to main only after tests pass

---

## 🚀 When Starting a New Chat Session

**ALWAYS do this first (before any coding):**

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Review recent history**
   ```bash
   git log --oneline -10
   git status
   ```

3. **Read critical documentation in order:**
   - `README.md` - Project overview and current status
   - `wiki/03_DEVELOPMENT_LOG.md` - Complete development history
   - `wiki/CHECKPOINT_[LATEST].md` - Most recent checkpoint state
   - `PROJECT_PLAN.md` - Overall roadmap (if exists)
   - `frontend/package.json` - Current dependencies (if frontend exists)

4. **Understand current state**
   - What's completed
   - What's in progress
   - What's next
   - Any blockers or issues

5. **Suggest next steps** based on established patterns from commits and docs

---

## 📋 Workflow Commands

### When User Says: **"Start"** or **"Initialize"**
→ Follow detailed instructions in **`01_INITIAL_SETUP.md`**

**Summary:**
- Initialize complete project structure for EA Assessment Dashboard
- Create wiki documentation
- Set up React + TypeScript + Vite application
- Implement EA data model (10 layers, 150+ vendors, 60+ questions)
- Create assessment questionnaire, visualization, and gap analysis components
- Configure Vercel deployment
- Create comprehensive README
- Make initial commits with clear messages

---

### When User Says: **"Checkpoint"** or **"Save progress"**
→ Follow detailed instructions in **`02_CHECKPOINT.md`**

**Summary:**
1. `git status` → `git add -A` → commit with descriptive message
2. Update `wiki/03_DEVELOPMENT_LOG.md` with session details
3. Update `README.md` with current status
4. Create `wiki/CHECKPOINT_[DATE].md` with:
   - What works now
   - What's in progress
   - What's next (priority order)
   - Critical notes
5. `git push origin main`
6. Verify: `git status` shows clean working tree
7. Provide checkpoint summary to user

---

### When User Says: **"Resume"** or **"Continue"**
→ Follow detailed instructions in **`03_RESUME_SESSION.md`**

**Summary:**
1. Pull latest code and analyze repository
2. Read all critical documentation
3. Provide comprehensive SESSION RESUME REPORT with:
   - Quick context (2-3 sentences)
   - Project status (completed/in-progress/planned)
   - Technical stack inventory
   - File structure overview
   - Recent commits analysis
   - Issues & blockers
   - Environment check
   - Recommended next steps
   - Session proposal
4. Wait for user confirmation before proceeding

---

## 🔄 Continuous Habits During Development

### Before Starting Any Phase:
- Review README and recent commits
- Check `wiki/03_DEVELOPMENT_LOG.md` for patterns

### During Development:
- Suggest next steps based on established patterns
- Use TodoWrite tool for multi-step tasks
- Update `wiki/03_DEVELOPMENT_LOG.md` as you progress

### When Debugging:
- Compare to working implementations from earlier commits
- Check commit history: `git log --grep="[search term]"`
- Use `git diff [commit-hash]` to see what changed

### When Validating:
- Ensure no regressions by running test suite
- Verify dev server runs: `npm run dev`
- Check for console errors/warnings

### After Each Major Task:
- Commit with clear, descriptive message following conventional commits
- Examples:
  - `feat: add dashboard component with KPI cards`
  - `fix: resolve TypeScript errors in data service`
  - `docs: update development log with session progress`
  - `config: add Vercel deployment configuration`

---

## 📁 Key Files to Always Check

| File | Purpose | When to Read |
|------|---------|--------------|
| `README.md` | Project overview, setup instructions | Every new session |
| `wiki/03_DEVELOPMENT_LOG.md` | Complete chronological history | Every new session |
| `wiki/CHECKPOINT_[LATEST].md` | Most recent state snapshot | When resuming |
| `PROJECT_PLAN.md` | Overall roadmap | When planning |
| `wiki/00_PROJECT_OVERVIEW.md` | Vision and goals | Reference as needed |
| `wiki/01_ARCHITECTURE.md` | System design | Before architectural changes |
| `wiki/02_DATA_STRUCTURE.md` | EA data models (layers, components, vendors) | Before data work |
| `EA ASSESSMENT DASHBOARD - PROJECT ANALYSIS & RECOMMENDATIONS.md` | Comprehensive project analysis & prompts | Reference for features & requirements |
| `src/data/` | EA layers, vendors, questions data | When updating assessment logic |

---

## 🎯 Expected Project Structure

```
Enterprise_Architecture_Assessment/
├── 00_CLAUDE_INSTRUCTIONS.md    # This file
├── 01_INITIAL_SETUP.md          # Detailed startup instructions
├── 02_CHECKPOINT.md             # Detailed checkpoint instructions
├── 03_RESUME_SESSION.md         # Detailed resume instructions
├── README.md                    # Project documentation
├── PROJECT_PLAN.md              # Roadmap
├── .gitignore
│
├── src/                         # React + TypeScript + Vite
│   ├── components/              # Reusable UI components
│   │   ├── assessment/         # Assessment questionnaire components
│   │   ├── visualization/      # EA map visualization components
│   │   ├── analysis/           # Gap analysis & recommendations
│   │   └── shared/             # Shared UI components
│   ├── pages/                  # Page components
│   ├── services/               # Data services
│   ├── types/                  # TypeScript interfaces
│   ├── data/                   # EA layers, components, vendors, questions
│   ├── utils/                  # Helper functions (scoring, gap detection)
│   ├── assets/                 # Images, icons
│   └── App.tsx
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
│
└── wiki/                        # Project documentation
    ├── 00_PROJECT_OVERVIEW.md
    ├── 01_ARCHITECTURE.md
    ├── 02_DATA_STRUCTURE.md
    ├── 03_DEVELOPMENT_LOG.md   # **MOST IMPORTANT**
    ├── 04_API_DOCUMENTATION.md
    └── CHECKPOINT_[DATE].md     # Created at each checkpoint
```

---

## 🔧 Tech Stack

**Frontend:**
- React + TypeScript + Vite
- TailwindCSS for styling (minimalist design)
- React Router for navigation
- Recharts for data visualization (maturity charts, gap analysis)
- Lucide-react for icons (EA layer icons)
- LocalStorage for save/load assessments
- jsPDF or react-pdf for PDF export

**Data & Logic:**
- Comprehensive EA data model (10 layers, 150+ vendors)
- Question bank (60+ questions, 9 categories)
- Maturity scoring algorithm (1-5 scale)
- Gap detection engine
- Recommendation engine with ROI calculations

**Deployment:**
- Vercel (https://enterprise-architecture-assessment.vercel.app/)

---

## ✅ Commit Strategy

Use conventional commit format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `config:` - Configuration changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**After completing significant work:**
```bash
git add -A
git commit -m "feat: [description]

- Bullet point of what changed
- Current status: [working/in-progress/needs-testing]

Next steps:
- What needs to be done next"

git push origin main
```

---

## 🚨 Critical Reminders

1. **Never start coding without reading recent commits and docs**
2. **Always update `wiki/03_DEVELOPMENT_LOG.md` during sessions**
3. **Create checkpoint before long breaks**
4. **Test that `npm run dev` works before ending session**
5. **Push to GitHub after every checkpoint**
6. **Follow established patterns from previous commits**
7. **Compare broken code to working implementations**

---

## 🎬 Quick Start for New Session

```bash
# 1. Navigate to project
cd /Users/husseinsrour/Downloads/Enterprise_Architecture_Assessment

# 2. Pull latest (if git repo initialized)
git pull origin main

# 3. Check status
git log --oneline -5
git status

# 4. Read docs (in order)
# - README.md
# - EA ASSESSMENT DASHBOARD - PROJECT ANALYSIS & RECOMMENDATIONS.md
# - wiki/03_DEVELOPMENT_LOG.md
# - wiki/CHECKPOINT_[LATEST].md

# 5. Ready to code!
```

---

**When in doubt, check the detailed instructions in:**
- `01_INITIAL_SETUP.md` - For project initialization
- `02_CHECKPOINT.md` - For saving progress
- `03_RESUME_SESSION.md` - For resuming work

**The single most important file:** `wiki/03_DEVELOPMENT_LOG.md` - Contains the complete chronological history of all decisions, changes, and progress.
