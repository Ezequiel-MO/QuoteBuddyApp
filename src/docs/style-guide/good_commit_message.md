## How to Write a Commit Message

1. **Start with a Capitalized Imperative Verb**:

   - Use action words like **Add**, **Fix**, **Update**, **Remove**, **Refactor**, etc.
   - **Examples**:
     - `Add validation for email input on user registration form`
     - `Fix crash on login page by initializing state`

2. Keep the subject line short (50 characters or less)

```bash
git commit -m "Add error handling for user registration form"
```

3. Separate Subject from Body with a Blank Line

This improves readability and helps some tools parse the commit message correctly.

```bash
Add error handling for user registration form

This commit introduces additional error handling for the user
registration form to manage edge cases where the form input is
invalid or incomplete. This change helps prevent application
crashes and improves the user experience by providing more
informative error messages.

Fixes #203
```

4. Use the Body to Explain What and Why vs. How:

- What: The content of the change
- Why: The intention behind the change

Examples:

- Good: `Add error handling for user registration form`
- Bad: `Add error handling`

5. Reference Issues and Pull Requests When Relevant

`Closes #203` will close issue #203 once the commit is merged into the default branch.
or
`Fixes #203` will mark issue #203 as fixed once the commit is merged into the default branch.

6. Use the Present Tense ("Add feature" not "Added feature")
   Maintain a consistent style across all commits.

Examples:

- Good: `Add new user registration workflow`
- Bad: `Added new feature for registration`

7. Use Bullet Points for Multiple Changes in the Body

When a commit involves multiple changes, list them clearly in bullet points.

```bash
Refactor user profile page

- Updated the layout to match new design guidelines
- Moved user settings to a separate component
- Improved responsiveness on mobile devices
```

8. Avoid Common Mistakes

- Being Vague: `Update code`
- Being Too Specific: `Update variable names in UserRegistrationForm.js`
- Not Explaining Why: `Update error handling`
- Combining Multiple Unrelated Changes: `Update user profile and fix login page`
- Using the Past Tense: `Updated user profile page`
