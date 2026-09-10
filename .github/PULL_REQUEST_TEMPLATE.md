# Pull Request Template

## Description

<!--- Describe your changes in detail. Include context about why this change is being made. -->

## Related Issue

<!--- If this PR fixes an issue, link it here: Fixes #issue_number -->

## Type of Change

<!--- Mark the appropriate option with an [x] -->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring (no functional changes)
- [ ] CI/CD related changes

## Testing Done

<!--- Describe the tests you ran to verify your changes -->

- [ ] Unit tests pass (`pnpm test`)
- [ ] TypeScript compilation succeeds (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Manual testing performed on:
  - [ ] Desktop (Chrome/Firefox/Safari/Edge)
  - [ ] Mobile (Driver UI tested on mobile viewport)
  - [ ] Edge cases handled

## Screenshots (if applicable)

<!--- Add screenshots or GIFs showing the changes in action -->

## Deployment Notes

<!--- Any special deployment considerations? Database migrations? Environment variables? -->

## Checklist

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have updated the CHANGELOG.md (if applicable)
- [ ] For Agent-related changes: Tested inter-agent communication
- [ ] For UI changes: Verified Urdu text rendering and accessibility (WCAG 2.1 AA)
- [ ] For API changes: Added/updated API documentation in docs/API.md

## Additional Context

<!--- Add any other context about the PR here -->

---

**Before merging:**
- Ensure all CI checks pass
- Get at least 1 approval from a code owner
- Squash commits if necessary
- Delete branch after merge
