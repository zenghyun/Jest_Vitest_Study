# Jest_Vitest_Study

### React Testing Library

- Not just a library, also a philosophy ("opinonated")
  - Test your software the way users actually use it
    - not internal implementation
  - Find elements by accessibility markers, not test IDs

### React Testing Library vs Jest ( of Vitest )

- React Testing Library
  - Provides simulated DOM for tests
  - Provides ways to manipulate and examine simulated DOM
- Jest / Vitest
  - Test runner that
  - Finds tests
  - Runs tests
  - Determines whether tests pass or fail
- This course uses Vitest

#### Assertions

단언은 테스트의 여부를 결정하는 것임

```
expect(linkElement).toBeInTheDocument();
expect(linkElement) => vitest에서는 이것이 존재한다고 기대한다는 뜻
```

- expect
  - Jest / Vitest global, starts the assertion
- expect() => expect argument
  - subject of the assertion
- toBeInTheDocument => matcher
  - type of assertion
  - this matcher comes from Jest-DOM
- toBeInTheDocument() => matcher argument
  - refines matcher

#### More assertion examples

```
expect(element.textContent).toBe('hello');
expect(elementsArray).toHaveLength(7);
```

#### Jest-DOM

- imported before each test (by test setup), makes matchers available
- DOM-based matchers
  - examples: toBeVisible() or toBeChecked()

## Jest와 Vitest의 동작 방식

- React Testing Library
  - Renders components into simulated DOM
  - Makes simulated DOM available for assertions and interactions
- Needs a test runner
  - Finds tests, runs them, makes assertions
- Jest / Vitest

## Jest vs Vitest

- Why Vitest?
  - Faster than Jest (3x - 5x)
  - Jest isn't easy to get working with Vite
- Jest is much easier with, say Next.js
  - https://github.com/vercel/next.js/tree/canary/examples/with-jest
- For this course, syntax is identical for Jest or Vitest
  - only setup differs
  - some more advanced syntax uses slightly different syntax

## How does Jest / Vitest Work?

- global test method has two arguments:
  - starting description
  - test function
- Test fails if error is thrown when running function
  - assertions throw errors when expectation fails
- No error -> tests pass
  - Empty test passes!

## TDD (Test-Driven Development)

- Write tests before writing code
  - then write code according to "spec" set by tests
- "red-green" testing
  - Tests fail before code is written

```
Write "shell" function => Write tests => Tests fail => Write code => Tests pass!
```

### Why TDD?

- Makes a huge difference in how it feels to write tests
  - part of the coding process, not a 'chore' to do at the end
  - 마지막에 해야하는 따분한 일이 아니라 코딩 프로세스의 일부이다.
- More efficient
  - Re-run tests 'for free' after changes

### What does React Testing Library Do?

- Creates virtual DOM for testing
  - and utilities for interacting with DOM
- Allows testing without a browser

### Types of Tests

- Unit tests
  - Tests one unit of code in isolation
- Integration tests
  - How multiple units work together
- Functional Tests
  - Tests a particular function of software
- Accptance / End-to-end (E2E) Tests
  - Use actual browser and server (Cypress, Selenium)

#### Functional Testing

##### different mindset from unit testing

- Unit Testing
  - Isolated: mock dependencies, test internals
  - ⭐️ Very easy to pinpoint failures
  - 👎 Further from how users interact with software
  - 👎 More likely to break with refactoring
- Functional Testing
  - Include all relevant units, test behavior
  - ⭐️ Close to how users interact with software
  - ⭐️ Robust tests
  - 👎 More difficult to debug failing tests

#### TDD vs BDD

- Quick detour for BDD: Behavior-Driven Development
- Testing Library encourages testing behavior over implementation
- So shouldn't we be calling this BDD instead of TDD?
  - actually, no.
- BDD is very explicitly defined
  - involves collaboration between lots of roles
    - developers, QA, business partners, etc
  - defines process for different groups to interact
- In the course, only developers so TDD!

#### Accessibility and Finding Elements

- Testing Library recommends finding elements by accessibility handles
  - https://testing-library.com/docs/guide-which-query/
- Can't find an element like a screen reader would?
  - Then your app isn't friendly to screen readers

### Discussion: When to Unit Test?

- When to unit test?
  - kebabCaseToTitleCase is pretty simple
  - colud be covered by functional tests on button
- For more complicated functions, unit tests help with:
  - covering all possible edge cases
  - determining wht caused functional tests to fail
- Issue with functional tests:
  - high-level makes them resistant to refactors
  - high-level makes them difficult to diagnose

### Vitest ESLint Plugin

- Vitest ESLint plugin
  - enforces best practices
  - makes sure test 'experiments' don't make it into CI
  - prevents ESLint from flagging Vitest globals like test and describe
  - https://github.com/veritem/eslint-plugin-vitest

### Differences from fireEvent and User-Event

- 'fireEvent' dispatches DOM events, whereas 'user-event' simulates full interactions, which may fire multiple events and do additional checks along the way.
- fireEvent는 단순히 DOM events를 발생시키는데 userEvent는 전반적인 상황의 흐름을 분석함
- 중요! user-event APIs always return a Promise (비동기)
- https://testing-library.com/docs/user-event

### screen Query Methods

#### command[All]ByQueryType

- command
  - get: expect element to be in DOM
  - query: expect element not to be in DOM
  - find: expect element to appear async
- [All]

  - (exclude) expect only one match
  - (include) expect more than one match

- QueryType
  - Role (most preferred)
  - AltText (images)
  - Text (display elements)
  - Form elements
    - PlaceholderText
    - LabelText
    - DisplayValue

### screen Query Reference

- https://testing-library.com/docs/dom-testing-library/api-queries
- https://testing-library.com/docs/react-testing-library/cheatsheet/
- https://testing-library.com/docs/guide-which-query

### How to find element

- From mockups, grand total should be same size as titles (<h2>)
  - we can search using the heading role
    - include the text in the name option
- Note: { exact : false } is not an option for \*byRole
  - Either use \*byRole and regular expression for name option, or
    - screen.getByRole('heading', {name: /grand total: \$/i});
  - \*byText and { exact: false }
    - screen.getByText('Grand total: $', { exact : false });
