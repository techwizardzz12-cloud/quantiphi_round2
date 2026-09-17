const now = new Date().toISOString()

const users = [
  { id: 1, name: 'Maya Chen', avatar: 'MC', createdAt: now },
  { id: 2, name: 'Noah Williams', avatar: 'NW', createdAt: now },
  { id: 3, name: 'Priya Shah', avatar: 'PS', createdAt: now },
  { id: 4, name: 'Liam Garcia', avatar: 'LG', createdAt: now },
  { id: 5, name: 'Sofia Kim', avatar: 'SK', createdAt: now },
  { id: 6, name: 'Ethan Brooks', avatar: 'EB', createdAt: now },
]

const projects = [{ id: 1, name: 'Product launch', createdAt: now }]

const tasks = [
  ['Map the new onboarding', 'Sketch the path from first click to first value.', 'High', '2026-09-20', 'todo', 1],
  ['Polish empty states', 'Give each blank screen a useful next step.', 'Medium', '2026-09-23', 'todo', 2],
  ['Write launch checklist', 'Collect the final launch steps and owners.', 'Low', '2026-09-25', 'todo', 3],
  ['Build analytics events', 'Add the core product events for the dashboard.', 'High', '2026-09-19', 'in_progress', 1],
  ['Review pricing page', 'Check content, links, and responsive behavior.', 'High', '2026-09-21', 'in_progress', 1],
  ['QA responsive layouts', 'Check the main screens at mobile breakpoints.', 'Medium', '2026-09-22', 'in_progress', 1],
  ['Prepare demo script', 'Turn the product story into a short walkthrough.', 'Low', '2026-09-24', 'in_progress', 1],
  ['Instrument activation funnel', 'Add tracking around the highest-value actions.', 'High', '2026-09-26', 'in_progress', 1],
  ['Clean up component states', 'Remove visual inconsistencies in shared components.', 'Medium', '2026-09-27', 'in_progress', 1],
  ['Write release notes', 'Summarize the improvements included in this release.', 'Low', '2026-09-18', 'done', 4],
  ['Approve brand illustrations', 'Make the final selection for launch surfaces.', 'Medium', '2026-09-17', 'done', 5],
  ['Set up support macros', 'Create reusable answers for common launch questions.', 'Low', '2026-09-16', 'done', 6],
].map(([title, description, priority, dueDate, status, assignedUserId], index) => ({
  id: index + 1, projectId: 1, title, description, priority, dueDate, status, assignedUserId, createdAt: now, updatedAt: now,
}))

export { projects, users }
export default tasks
