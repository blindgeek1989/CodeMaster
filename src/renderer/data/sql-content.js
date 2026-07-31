const sqlModule = {
  id: 'sql',
  title: 'SQL Fundamentals',
  description: 'SQL (Structured Query Language) is the standard language for working with relational databases. It is used in nearly every software application to store, retrieve, and manage data. We start from zero — no database experience needed.',
  objectives: [
    'Understand what a database is and how data is organised into tables',
    'Retrieve data from a table using SELECT statements',
    'Filter rows with WHERE and sort results with ORDER BY',
    'Add new data to a table using INSERT INTO',
    'Update existing data using UPDATE',
    'Delete data safely using DELETE with WHERE',
    'Summarise data using aggregate functions and GROUP BY',
    'Combine data from multiple tables using JOIN',
  ],
  goals: [
    'Write a SELECT query that retrieves specific columns from a table',
    'Filter rows with a WHERE clause using multiple conditions',
    'Insert a new record into a table',
    'Count and group rows with COUNT and GROUP BY',
    'Join two tables and retrieve columns from both',
  ],
  lessons: [
    {
      id: 'sql-1',
      title: 'Lesson 1: What Is SQL?',
      content: `SQL stands for Structured Query Language. It is the language you use to communicate with a relational database. Almost every application that stores data — websites, mobile apps, desktop tools, banking systems — uses a database, and SQL is how you talk to it.

WHAT IS A DATABASE?
A database is an organised collection of data. Think of it like a highly structured collection of spreadsheets, where each spreadsheet is called a table.

WHAT IS A RELATIONAL DATABASE?
A relational database stores data in tables that can be related to each other. For example, an e-commerce application might have:
  - A customers table (id, name, email)
  - A products table (id, name, price)
  - An orders table (id, customer_id, product_id, date)

The orders table links to customers and products through the shared id values.

WHAT IS SQL?
SQL is the language you write to ask the database questions and give it instructions. A SQL command is called a query. Here are the four most important types of query:

  SELECT — Retrieve data ("Show me all customers")
  INSERT — Add data ("Add this new customer")
  UPDATE — Change data ("Update this customer's email")
  DELETE — Remove data ("Delete this old order")

SQL is NOT case-sensitive for keywords — SELECT and select mean the same thing. Convention uses uppercase for SQL keywords and lowercase for table/column names.

WHAT IS SQLITE?
SQLite is a lightweight relational database that runs as a single file. It is built into many applications and devices — including CodeMaster. Every query you run in this module executes against a real in-memory SQLite database. You will see real results.

WHAT MAKES SQL ACCESSIBLE?
SQL is pure text. Every query is a plain text command. There are no graphical elements, drag-and-drop interfaces, or visual-only tools required to write SQL. Screen readers and keyboard users can write SQL just as effectively as anyone else.`,
      quiz: [
        {
          question: 'What does SELECT do in SQL?',
          options: [
            'It adds new rows to a table',
            'It retrieves data from a table',
            'It deletes rows from a table',
            'It creates a new table',
          ],
          answer: 1,
        },
        {
          question: 'What is a "table" in a relational database?',
          options: [
            'A visual chart of data',
            'A file stored on disk',
            'A structured set of data organised into rows and columns',
            'A connection between two databases',
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: '',
        steps: [
          {
            instruction: 'Step 1: SQL has no code to run for this conceptual lesson. Type the four main SQL command types as SQL comments (each starting with --), one per line: SELECT, INSERT, UPDATE, DELETE.',
            starterCode: '-- The four main SQL query types:\n',
            solution: '-- The four main SQL query types:\n-- SELECT\n-- INSERT\n-- UPDATE\n-- DELETE',
          },
        ],
      },
    },
    {
      id: 'sql-2',
      title: 'Lesson 2: Your First SELECT Query',
      content: `The SELECT statement is the most common SQL command. It retrieves data from one or more tables. Every result you see from a SELECT is called a result set.

BASIC SYNTAX
SELECT columns FROM table_name;

The semicolon at the end is conventional — it tells SQL the statement is complete.

SELECTING ALL COLUMNS
The * wildcard means "all columns":

  SELECT * FROM employees;

This returns every column and every row in the employees table.

SELECTING SPECIFIC COLUMNS
List the column names separated by commas:

  SELECT name, salary FROM employees;

This returns only the name and salary columns — much more efficient than *.

COLUMN ALIASES WITH AS
Rename a column in the output using AS:

  SELECT name AS employee_name, salary AS annual_salary
  FROM employees;

The alias appears as the column header in results but does not change the actual table.

THE TABLE WE'LL USE
Throughout this module we'll use an employees table with this structure:

  id        — unique number identifying each employee
  name      — employee's full name
  department — which team they work in
  salary    — annual salary in dollars
  hire_date — the date they were hired

This table has 8 employees across three departments: Engineering, Marketing, and Sales.`,
      quiz: [
        {
          question: 'What does SELECT * FROM employees return?',
          options: [
            'Only the first row',
            'Only the id column',
            'All columns and all rows from the employees table',
            'A count of how many employees there are',
          ],
          answer: 2,
        },
        {
          question: 'What does the AS keyword do in a SELECT statement?',
          options: [
            'It filters the results',
            'It sorts the results',
            'It renames a column in the result set',
            'It joins two tables',
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary REAL NOT NULL,
  hire_date TEXT NOT NULL
);
INSERT INTO employees VALUES
  (1, 'Alice Chen',     'Engineering', 95000, '2021-03-15'),
  (2, 'Bob Okafor',     'Marketing',   62000, '2020-07-01'),
  (3, 'Carol Singh',    'Engineering', 88000, '2022-01-10'),
  (4, 'David Marsh',    'Sales',       71000, '2019-11-22'),
  (5, 'Eva Torres',     'Engineering', 102000,'2018-05-30'),
  (6, 'Frank Reyes',    'Marketing',   58000, '2023-02-14'),
  (7, 'Grace Obi',      'Sales',       75000, '2021-08-08'),
  (8, 'Henry Liu',      'Engineering', 91000, '2020-12-01');`,
        steps: [
          {
            instruction: 'Step 1: Write a SELECT query that retrieves ALL columns and ALL rows from the employees table.',
            starterCode: '-- Select all columns from employees\n',
            solution: 'SELECT * FROM employees;',
          },
          {
            instruction: 'Step 2: Write a SELECT query that retrieves only the name and department columns from the employees table.',
            starterCode: '-- Select only name and department\n',
            solution: 'SELECT name, department FROM employees;',
          },
          {
            instruction: 'Step 3: Write a SELECT query that retrieves name and salary, aliasing salary as annual_pay.',
            starterCode: '-- Select name and salary (alias salary as annual_pay)\n',
            solution: 'SELECT name, salary AS annual_pay FROM employees;',
          },
        ],
      },
    },
    {
      id: 'sql-3',
      title: 'Lesson 3: Filtering with WHERE',
      content: `The WHERE clause filters rows. Only rows where the condition is TRUE are included in the result. It is the most important clause for writing useful queries.

BASIC SYNTAX
SELECT columns FROM table WHERE condition;

COMPARISON OPERATORS
  =      Equal to            WHERE department = 'Engineering'
  !=     Not equal to        WHERE department != 'Sales'
  >      Greater than        WHERE salary > 80000
  <      Less than           WHERE salary < 60000
  >=     Greater than or equal   WHERE salary >= 90000
  <=     Less than or equal      WHERE salary <= 70000

STRING COMPARISON
Strings in SQL use single quotes (not double quotes):
  WHERE name = 'Alice Chen'

COMBINING CONDITIONS
Use AND (both must be true) and OR (either must be true):

  WHERE department = 'Engineering' AND salary > 90000
  WHERE department = 'Sales' OR department = 'Marketing'

Use parentheses to control order when mixing AND and OR:
  WHERE (department = 'Engineering' OR department = 'Marketing') AND salary > 70000

PATTERN MATCHING WITH LIKE
LIKE lets you search for partial text matches. % matches any number of characters:
  WHERE name LIKE 'A%'        -- names starting with A
  WHERE name LIKE '%Chen'     -- names ending with Chen
  WHERE department LIKE '%ing' -- departments ending in "ing"

NULL CHECKS
Never use = to check for NULL — it always returns false. Use IS NULL or IS NOT NULL:
  WHERE manager_id IS NULL
  WHERE email IS NOT NULL`,
      quiz: [
        {
          question: 'Which query returns only employees in the Engineering department?',
          options: [
            "SELECT * FROM employees WHERE department == 'Engineering';",
            "SELECT * FROM employees WHERE department = 'Engineering';",
            "SELECT * FROM employees FILTER department = 'Engineering';",
            "SELECT department = 'Engineering' FROM employees;",
          ],
          answer: 1,
        },
        {
          question: "What does WHERE name LIKE 'E%' match?",
          options: [
            "Names that contain the letter E anywhere",
            "Names that are exactly one character: E",
            "Names that start with the letter E",
            "Names that end with the letter E",
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01'),(3,'Carol Singh','Engineering',88000,'2022-01-10'),(4,'David Marsh','Sales',71000,'2019-11-22'),(5,'Eva Torres','Engineering',102000,'2018-05-30'),(6,'Frank Reyes','Marketing',58000,'2023-02-14'),(7,'Grace Obi','Sales',75000,'2021-08-08'),(8,'Henry Liu','Engineering',91000,'2020-12-01');`,
        steps: [
          {
            instruction: 'Step 1: Write a query that returns all columns for employees in the Engineering department only.',
            starterCode: "-- Return all Engineering employees\n",
            solution: "SELECT * FROM employees WHERE department = 'Engineering';",
          },
          {
            instruction: 'Step 2: Write a query that returns name and salary for employees earning more than 80000.',
            starterCode: '-- Return name and salary for high earners\n',
            solution: 'SELECT name, salary FROM employees WHERE salary > 80000;',
          },
          {
            instruction: "Step 3: Write a query that returns all columns for employees in Engineering OR Marketing (two conditions joined with OR).",
            starterCode: '-- Return employees from Engineering OR Marketing\n',
            solution: "SELECT * FROM employees WHERE department = 'Engineering' OR department = 'Marketing';",
          },
        ],
      },
    },
    {
      id: 'sql-4',
      title: 'Lesson 4: Sorting and Limiting Results',
      content: `By default, SQL returns rows in no guaranteed order. ORDER BY lets you control how results are sorted. LIMIT restricts how many rows are returned — essential for performance on large datasets.

ORDER BY
  SELECT * FROM employees ORDER BY salary;

This sorts by salary in ascending order (lowest first) by default.

ASC AND DESC
  ORDER BY salary ASC    -- ascending (low to high) — the default
  ORDER BY salary DESC   -- descending (high to low)

SORTING BY MULTIPLE COLUMNS
If two rows have the same salary, sort by name alphabetically as a tiebreaker:

  ORDER BY salary DESC, name ASC

SQL processes ORDER BY columns from left to right.

LIMIT — RESTRICT THE NUMBER OF ROWS
  SELECT * FROM employees ORDER BY salary DESC LIMIT 3;

Returns the 3 highest-paid employees.

OFFSET — SKIP ROWS (for pagination)
  SELECT * FROM employees ORDER BY id LIMIT 5 OFFSET 5;

Returns rows 6–10 (skip the first 5, then take 5). Used to build "page 2, page 3" navigation in applications.

COMBINING WHERE, ORDER BY, AND LIMIT
The full SELECT statement order matters:

  SELECT columns
  FROM table
  WHERE condition
  ORDER BY column ASC|DESC
  LIMIT n OFFSET m;

Always write clauses in this order — SQL requires it.`,
      quiz: [
        {
          question: 'What does ORDER BY salary DESC return first?',
          options: [
            'The lowest salary',
            'The highest salary',
            'Rows sorted alphabetically',
            'The oldest hire date',
          ],
          answer: 1,
        },
        {
          question: 'What is LIMIT used for?',
          options: [
            'To filter rows based on a condition',
            'To restrict the number of rows returned',
            'To join two tables',
            'To rename a column',
          ],
          answer: 1,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01'),(3,'Carol Singh','Engineering',88000,'2022-01-10'),(4,'David Marsh','Sales',71000,'2019-11-22'),(5,'Eva Torres','Engineering',102000,'2018-05-30'),(6,'Frank Reyes','Marketing',58000,'2023-02-14'),(7,'Grace Obi','Sales',75000,'2021-08-08'),(8,'Henry Liu','Engineering',91000,'2020-12-01');`,
        steps: [
          {
            instruction: 'Step 1: Write a query that returns all employees sorted by name in alphabetical (ascending) order.',
            starterCode: '-- Sort employees by name A-Z\n',
            solution: 'SELECT * FROM employees ORDER BY name ASC;',
          },
          {
            instruction: 'Step 2: Write a query that returns only the name and salary of the top 3 highest-paid employees.',
            starterCode: '-- Top 3 earners by salary (highest first)\n',
            solution: 'SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;',
          },
          {
            instruction: 'Step 3: Write a query that returns all Engineering employees sorted by salary from highest to lowest.',
            starterCode: "-- Engineering employees, highest salary first\n",
            solution: "SELECT * FROM employees WHERE department = 'Engineering' ORDER BY salary DESC;",
          },
        ],
      },
    },
    {
      id: 'sql-5',
      title: 'Lesson 5: Adding Data with INSERT',
      content: `The INSERT INTO statement adds new rows to a table. This is how new records are created — a new user signs up, a product is added to inventory, a form is submitted.

BASIC SYNTAX
INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);

The column list and value list must match in order and count.

INSERTING A SINGLE ROW
INSERT INTO employees (name, department, salary, hire_date)
VALUES ('Iris Park', 'Engineering', 87000, '2024-01-15');

Notice: we omit the id column because it is defined as INTEGER PRIMARY KEY, which means SQLite assigns it automatically (auto-increment).

INSERTING MULTIPLE ROWS AT ONCE
INSERT INTO employees (name, department, salary, hire_date) VALUES
  ('Jack Kim',   'Sales',       68000, '2024-02-01'),
  ('Kara Nweze', 'Marketing',   55000, '2024-03-10'),
  ('Leo Martin', 'Engineering', 94000, '2024-04-05');

This is much more efficient than three separate INSERT statements.

VERIFYING THE INSERT
After inserting, run a SELECT to confirm the new row was added:

  INSERT INTO employees (name, department, salary, hire_date)
  VALUES ('Iris Park', 'Engineering', 87000, '2024-01-15');

  SELECT * FROM employees WHERE name = 'Iris Park';

IMPORTANT SAFETY RULE
Always specify the column names in INSERT statements. If the table structure changes (a column is added or reordered), a column-list INSERT still works. An INSERT without column names (INSERT INTO t VALUES (...)) breaks if the schema changes.`,
      quiz: [
        {
          question: 'Why is it best practice to specify column names in an INSERT statement?',
          options: [
            'SQL requires it — you cannot omit column names',
            'It runs faster without column names',
            'If the table structure changes, a column-list INSERT still works correctly',
            'It is required to insert multiple rows at once',
          ],
          answer: 2,
        },
        {
          question: 'Which statement correctly inserts a new employee named "Sam" into the Engineering department with salary 75000?',
          options: [
            "ADD INTO employees VALUES ('Sam', 'Engineering', 75000);",
            "INSERT employees SET name='Sam', department='Engineering', salary=75000;",
            "INSERT INTO employees (name, department, salary, hire_date) VALUES ('Sam', 'Engineering', 75000, '2024-01-01');",
            "CREATE ROW employees ('Sam', 'Engineering', 75000);",
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01');`,
        steps: [
          {
            instruction: "Step 1: Insert a new employee into the employees table: name = 'Sam Lee', department = 'Sales', salary = 72000, hire_date = '2024-06-01'. Then SELECT all rows to verify.",
            starterCode: '-- Insert Sam Lee, then select all rows\n',
            solution: "INSERT INTO employees (name, department, salary, hire_date)\nVALUES ('Sam Lee', 'Sales', 72000, '2024-06-01');\nSELECT * FROM employees;",
          },
          {
            instruction: "Step 2: Insert two employees in a single INSERT statement: ('Mia Hall', 'Engineering', 89000, '2024-07-01') and ('Noah Park', 'Marketing', 61000, '2024-07-15'). Then SELECT all rows.",
            starterCode: '-- Insert two employees in one statement, then select all\n',
            solution: "INSERT INTO employees (name, department, salary, hire_date) VALUES\n  ('Mia Hall', 'Engineering', 89000, '2024-07-01'),\n  ('Noah Park', 'Marketing', 61000, '2024-07-15');\nSELECT * FROM employees;",
          },
          {
            instruction: "Step 3: Insert one more employee ('Olivia Tan', 'Engineering', 97000, '2024-08-01'), then SELECT only name and salary for Engineering employees.",
            starterCode: '-- Insert Olivia Tan, then select Engineering employees\n',
            solution: "INSERT INTO employees (name, department, salary, hire_date)\nVALUES ('Olivia Tan', 'Engineering', 97000, '2024-08-01');\nSELECT name, salary FROM employees WHERE department = 'Engineering';",
          },
        ],
      },
    },
    {
      id: 'sql-6',
      title: 'Lesson 6: Updating Data with UPDATE',
      content: `The UPDATE statement modifies existing rows in a table. It is one of the most important — and most dangerous — SQL commands. A mistake in an UPDATE (or forgetting the WHERE clause) can corrupt all your data.

BASIC SYNTAX
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;

ALWAYS USE WHERE WITH UPDATE
Without WHERE, UPDATE changes EVERY row in the table:

  -- DANGEROUS: updates ALL employees' salaries
  UPDATE employees SET salary = 0;

  -- CORRECT: only updates Alice Chen
  UPDATE employees SET salary = 98000 WHERE name = 'Alice Chen';

Always check your WHERE clause before running an UPDATE.

UPDATING MULTIPLE COLUMNS AT ONCE
Separate column assignments with commas:

  UPDATE employees
  SET salary = 98000, department = 'Engineering'
  WHERE id = 1;

UPDATING WITH CALCULATIONS
You can reference the current value of the column:

  UPDATE employees
  SET salary = salary * 1.10    -- 10% raise for everyone in Engineering
  WHERE department = 'Engineering';

VERIFYING BEFORE UPDATING
Before running an UPDATE, run the equivalent SELECT to preview which rows will be affected:

  -- Preview
  SELECT * FROM employees WHERE id = 1;

  -- Then update
  UPDATE employees SET salary = 98000 WHERE id = 1;

Using id in WHERE is the safest approach — it uniquely identifies exactly one row.`,
      quiz: [
        {
          question: 'What happens if you run UPDATE employees SET salary = 0; without a WHERE clause?',
          options: [
            'Nothing — SQL requires a WHERE clause and will throw an error',
            'Only the first row is updated',
            'Every row in the employees table gets salary set to 0',
            'Only the last row is updated',
          ],
          answer: 2,
        },
        {
          question: 'What is the safest column to use in a WHERE clause when updating a specific row?',
          options: [
            'The name column',
            'The department column',
            'The primary key (id) column — it uniquely identifies exactly one row',
            'Any column works equally well',
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01'),(3,'Carol Singh','Engineering',88000,'2022-01-10'),(4,'David Marsh','Sales',71000,'2019-11-22'),(5,'Eva Torres','Engineering',102000,'2018-05-30');`,
        steps: [
          {
            instruction: "Step 1: Update Alice Chen's salary to 98000 (use id = 1 in the WHERE clause). Then SELECT all rows to verify.",
            starterCode: "-- Update Alice's salary, then select all\n",
            solution: 'UPDATE employees SET salary = 98000 WHERE id = 1;\nSELECT * FROM employees;',
          },
          {
            instruction: "Step 2: Give all Engineering employees a 10% raise by multiplying salary by 1.10. Then SELECT name and salary for Engineering employees.",
            starterCode: "-- 10% raise for Engineering, then select their names and salaries\n",
            solution: "UPDATE employees SET salary = salary * 1.10 WHERE department = 'Engineering';\nSELECT name, salary FROM employees WHERE department = 'Engineering';",
          },
          {
            instruction: "Step 3: Move Bob Okafor (id = 2) to the Sales department AND give him a new salary of 68000. Then SELECT all rows to verify both changes.",
            starterCode: "-- Update Bob's department and salary in one statement\n",
            solution: "UPDATE employees SET department = 'Sales', salary = 68000 WHERE id = 2;\nSELECT * FROM employees;",
          },
        ],
      },
    },
    {
      id: 'sql-7',
      title: 'Lesson 7: Deleting Data with DELETE',
      content: `The DELETE statement removes rows from a table. Like UPDATE, it is permanent and potentially dangerous — but it is a normal part of data management.

BASIC SYNTAX
DELETE FROM table_name WHERE condition;

ALWAYS USE WHERE WITH DELETE
Without WHERE, DELETE removes EVERY row from the table (but keeps the table structure):

  -- DANGEROUS: empties the entire employees table
  DELETE FROM employees;

  -- CORRECT: removes only the employee with id = 6
  DELETE FROM employees WHERE id = 6;

DELETING MULTIPLE ROWS
WHERE can match multiple rows — they all get deleted:

  DELETE FROM employees WHERE department = 'Sales';
  -- Deletes all Sales employees at once

PREVIEW BEFORE DELETING
Always run the equivalent SELECT first to see exactly what will be deleted:

  -- Preview: who will be deleted?
  SELECT * FROM employees WHERE department = 'Sales';

  -- Then delete
  DELETE FROM employees WHERE department = 'Sales';

TRANSACTIONS: PROTECTING YOUR DATA
In production databases you would wrap a DELETE in a transaction so you can roll it back if something goes wrong:

  BEGIN;
  DELETE FROM employees WHERE id = 5;
  -- Verify with SELECT before committing
  SELECT * FROM employees;
  COMMIT;   -- or ROLLBACK; to undo

For now, understand that transactions exist as a safety net.

DELETE vs TRUNCATE vs DROP
  DELETE FROM employees;             — removes all rows, table structure remains
  DROP TABLE employees;              — removes the entire table and all its data permanently`,
      quiz: [
        {
          question: 'What is the safest way to verify a DELETE before running it?',
          options: [
            'Run the DELETE and then check if it worked',
            'Run an equivalent SELECT with the same WHERE clause to preview which rows will be affected',
            'Add PREVIEW before the DELETE keyword',
            'Run the DELETE without a WHERE clause first',
          ],
          answer: 1,
        },
        {
          question: 'What does DELETE FROM employees; (without a WHERE clause) do?',
          options: [
            'Deletes the employees table entirely',
            'Throws a syntax error',
            'Deletes all rows from employees but keeps the table structure',
            'Deletes only the last row',
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01'),(3,'Carol Singh','Engineering',88000,'2022-01-10'),(4,'David Marsh','Sales',71000,'2019-11-22'),(5,'Eva Torres','Engineering',102000,'2018-05-30'),(6,'Frank Reyes','Marketing',58000,'2023-02-14');`,
        steps: [
          {
            instruction: 'Step 1: First preview who will be deleted: SELECT all employees where salary < 60000. This is the "check before you delete" step.',
            starterCode: '-- Preview: which employees earn less than 60000?\n',
            solution: 'SELECT * FROM employees WHERE salary < 60000;',
          },
          {
            instruction: 'Step 2: Now delete Frank Reyes (id = 6). Then SELECT all rows to confirm he is gone.',
            starterCode: '-- Delete Frank Reyes by id, then select all\n',
            solution: 'DELETE FROM employees WHERE id = 6;\nSELECT * FROM employees;',
          },
          {
            instruction: "Step 3: Delete all Marketing employees. Then SELECT all remaining rows.",
            starterCode: "-- Delete all Marketing employees, then select all remaining\n",
            solution: "DELETE FROM employees WHERE department = 'Marketing';\nSELECT * FROM employees;",
          },
        ],
      },
    },
    {
      id: 'sql-8',
      title: 'Lesson 8: Aggregate Functions and GROUP BY',
      content: `Aggregate functions perform calculations across a set of rows and return a single result. They answer questions like: "How many employees do we have?" or "What is the average salary by department?"

THE FIVE MAIN AGGREGATES
  COUNT(*)       — counts all rows
  COUNT(column)  — counts rows where column is not NULL
  SUM(column)    — adds all values
  AVG(column)    — calculates the average
  MIN(column)    — finds the smallest value
  MAX(column)    — finds the largest value

EXAMPLES
  SELECT COUNT(*) FROM employees;              -- total number of employees
  SELECT SUM(salary) FROM employees;           -- total salary budget
  SELECT AVG(salary) FROM employees;           -- average salary
  SELECT MIN(salary), MAX(salary) FROM employees; -- salary range

USING ALIASES WITH AGGREGATES
Column headers for aggregates are ugly by default. Use AS to give them readable names:

  SELECT COUNT(*) AS total_employees,
         AVG(salary) AS average_salary
  FROM employees;

GROUP BY — AGGREGATE PER CATEGORY
GROUP BY splits rows into groups and applies the aggregate to each group:

  SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department;

This returns one row per department with the count and average for each.

FILTERING GROUPS WITH HAVING
HAVING filters groups after aggregation (WHERE filters rows before aggregation):

  SELECT department, COUNT(*) AS headcount
  FROM employees
  GROUP BY department
  HAVING COUNT(*) >= 3;

Only returns departments with 3 or more employees.

THE FULL QUERY ORDER
  SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT`,
      quiz: [
        {
          question: 'What is the difference between WHERE and HAVING?',
          options: [
            'They are identical — either can be used in the same place',
            'WHERE filters individual rows before aggregation; HAVING filters groups after aggregation',
            'HAVING filters individual rows; WHERE filters groups',
            'WHERE is for text columns; HAVING is for numeric columns',
          ],
          answer: 1,
        },
        {
          question: 'Which query counts the number of employees in each department?',
          options: [
            'SELECT COUNT(*) FROM employees;',
            'SELECT department, COUNT(*) FROM employees GROUP BY department;',
            'SELECT COUNT(*) BY department FROM employees;',
            'SELECT department COUNT FROM employees;',
          ],
          answer: 1,
        },
      ],
      exercise: {
        schema: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, department TEXT, salary REAL, hire_date TEXT);
INSERT INTO employees VALUES (1,'Alice Chen','Engineering',95000,'2021-03-15'),(2,'Bob Okafor','Marketing',62000,'2020-07-01'),(3,'Carol Singh','Engineering',88000,'2022-01-10'),(4,'David Marsh','Sales',71000,'2019-11-22'),(5,'Eva Torres','Engineering',102000,'2018-05-30'),(6,'Frank Reyes','Marketing',58000,'2023-02-14'),(7,'Grace Obi','Sales',75000,'2021-08-08'),(8,'Henry Liu','Engineering',91000,'2020-12-01');`,
        steps: [
          {
            instruction: 'Step 1: Write a query that returns the total number of employees using COUNT(*), aliased as total_employees.',
            starterCode: '-- Count all employees\n',
            solution: 'SELECT COUNT(*) AS total_employees FROM employees;',
          },
          {
            instruction: 'Step 2: Write a query that returns each department name, the number of employees in that department (as headcount), and the average salary (as avg_salary). Use GROUP BY.',
            starterCode: '-- Count and average salary per department\n',
            solution: 'SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees GROUP BY department;',
          },
          {
            instruction: 'Step 3: Write a query that returns the department with the highest total salary budget (SUM of salaries), aliased as total_budget, sorted highest to lowest.',
            starterCode: '-- Total salary budget per department, highest first\n',
            solution: 'SELECT department, SUM(salary) AS total_budget FROM employees GROUP BY department ORDER BY total_budget DESC;',
          },
        ],
      },
    },
    {
      id: 'sql-9',
      title: 'Lesson 9: Joining Tables',
      content: `One of the most powerful features of relational databases is the ability to connect data across multiple tables. JOINs combine rows from two or more tables based on a related column.

WHY JOIN?
Storing all data in one table would mean repetition. Instead, we split data into focused tables and link them with foreign keys.

THE TABLES WE'LL JOIN
  employees: id, name, department_id, salary
  departments: id, name, location, budget

employees.department_id matches departments.id — this is the foreign key relationship.

INNER JOIN
Returns only rows that have a match in BOTH tables:

  SELECT employees.name, departments.name AS dept_name, departments.location
  FROM employees
  INNER JOIN departments ON employees.department_id = departments.id;

Employees with no matching department would be excluded (none in our case).

TABLE ALIASES — SHORTER SYNTAX
Give tables short aliases to reduce typing:

  SELECT e.name, d.name AS dept_name, d.location
  FROM employees e
  INNER JOIN departments d ON e.department_id = d.id;

LEFT JOIN
Returns ALL rows from the left table, and matching rows from the right. Non-matching right rows become NULL:

  SELECT e.name, d.name AS dept_name
  FROM employees e
  LEFT JOIN departments d ON e.department_id = d.id;

Employees with no matching department still appear, with NULL for dept_name.

JOINING WITH WHERE
Add a WHERE clause after the JOIN to filter the combined result:

  SELECT e.name, d.name AS dept_name, d.location
  FROM employees e
  INNER JOIN departments d ON e.department_id = d.id
  WHERE d.location = 'London';`,
      quiz: [
        {
          question: 'What does INNER JOIN return?',
          options: [
            'All rows from both tables',
            'All rows from the left table and matching rows from the right',
            'Only rows that have a matching record in both tables',
            'Only rows from the right table',
          ],
          answer: 2,
        },
        {
          question: 'In ON employees.dept_id = departments.id, what does this condition express?',
          options: [
            'That the two tables must have the same number of rows',
            'The relationship between the tables — match each employee row to the department row with the same id',
            'That dept_id and id must both be zero',
            'A WHERE filter applied before the join',
          ],
          answer: 1,
        },
      ],
      exercise: {
        schema: `CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, location TEXT, budget REAL);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary REAL);
INSERT INTO departments VALUES (1,'Engineering','London',500000),(2,'Marketing','Manchester',200000),(3,'Sales','Birmingham',300000);
INSERT INTO employees VALUES (1,'Alice Chen',1,95000),(2,'Bob Okafor',2,62000),(3,'Carol Singh',1,88000),(4,'David Marsh',3,71000),(5,'Eva Torres',1,102000),(6,'Frank Reyes',2,58000),(7,'Grace Obi',3,75000),(8,'Henry Liu',1,91000);`,
        steps: [
          {
            instruction: 'Step 1: Write an INNER JOIN query that returns each employee\'s name and their department\'s name (alias it as dept_name). Join employees to departments on employees.dept_id = departments.id.',
            starterCode: '-- Join employees to departments, show name and dept_name\n',
            solution: 'SELECT e.name, d.name AS dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;',
          },
          {
            instruction: "Step 2: Extend your join to also show the location and salary. Filter to only show employees in the 'London' location.",
            starterCode: "-- Join employees to departments, show name, dept_name, location, salary — London only\n",
            solution: "SELECT e.name, d.name AS dept_name, d.location, e.salary\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id\nWHERE d.location = 'London';",
          },
          {
            instruction: 'Step 3: Write a query that shows each department\'s name and the total salary of employees in it (as dept_total). Use INNER JOIN, GROUP BY, and ORDER BY dept_total descending.',
            starterCode: '-- Total salary per department, highest first\n',
            solution: 'SELECT d.name, SUM(e.salary) AS dept_total\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id\nGROUP BY d.name\nORDER BY dept_total DESC;',
          },
        ],
      },
    },
    {
      id: 'sql-10',
      title: 'Lesson 10: Putting It All Together',
      content: `In this final lesson we bring together everything you have learned — SELECT, WHERE, ORDER BY, LIMIT, INSERT, UPDATE, DELETE, aggregates, GROUP BY, and JOINs — in realistic, multi-step queries.

THE SCENARIO
You are a data analyst at a company. The database has three tables:
  - employees (id, name, dept_id, salary, hire_date)
  - departments (id, name, location)
  - projects (id, name, dept_id, budget)

COMPLEX QUERIES
Multi-clause queries are just combinations of the building blocks you already know:

  SELECT e.name, d.name AS department, p.name AS project, p.budget
  FROM employees e
  INNER JOIN departments d ON e.dept_id = d.id
  INNER JOIN projects p ON d.id = p.dept_id
  WHERE e.salary > 80000
  ORDER BY p.budget DESC
  LIMIT 5;

Read each clause one at a time: FROM employees (start here), JOIN departments (add dept info), JOIN projects (add project info), WHERE (filter to high earners), ORDER BY (sort by project budget), LIMIT (top 5 results).

SUBQUERIES — QUERIES INSIDE QUERIES
A subquery is a SELECT inside another SELECT. Use it when you need to compute something before filtering:

  -- Employees earning above the company average salary
  SELECT name, salary
  FROM employees
  WHERE salary > (SELECT AVG(salary) FROM employees);

The inner query runs first (calculating the average), then the outer query uses that result.

TIPS FOR WRITING SQL
1. Start with SELECT * and a simple WHERE — see the raw data first.
2. Add ORDER BY and LIMIT to focus on relevant rows.
3. Add GROUP BY and aggregates once you understand the data.
4. Build JOINs one table at a time.
5. Always test your WHERE clause with SELECT before UPDATE or DELETE.
6. Use column aliases (AS) to make results readable.`,
      quiz: [
        {
          question: 'What is a subquery?',
          options: [
            'A query that is saved to a file',
            'A SELECT statement nested inside another SQL statement',
            'A shortcut for writing long JOIN clauses',
            'A query that runs automatically on a schedule',
          ],
          answer: 1,
        },
        {
          question: 'What is the correct order of clauses in a full SELECT statement?',
          options: [
            'SELECT → WHERE → FROM → GROUP BY → ORDER BY',
            'FROM → SELECT → WHERE → ORDER BY → GROUP BY',
            'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT',
            'SELECT → FROM → ORDER BY → WHERE → GROUP BY',
          ],
          answer: 2,
        },
      ],
      exercise: {
        schema: `CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, location TEXT);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, salary REAL, hire_date TEXT);
CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT, dept_id INTEGER, budget REAL);
INSERT INTO departments VALUES (1,'Engineering','London'),(2,'Marketing','Manchester'),(3,'Sales','Birmingham');
INSERT INTO employees VALUES (1,'Alice Chen',1,95000,'2021-03-15'),(2,'Bob Okafor',2,62000,'2020-07-01'),(3,'Carol Singh',1,88000,'2022-01-10'),(4,'David Marsh',3,71000,'2019-11-22'),(5,'Eva Torres',1,102000,'2018-05-30'),(6,'Frank Reyes',2,58000,'2023-02-14'),(7,'Grace Obi',3,75000,'2021-08-08'),(8,'Henry Liu',1,91000,'2020-12-01');
INSERT INTO projects VALUES (1,'Platform Rebuild',1,250000),(2,'Brand Campaign',2,80000),(3,'Sales Automation',3,120000),(4,'API Gateway',1,150000);`,
        steps: [
          {
            instruction: 'Step 1: Find all employees earning above the company average salary. Use a subquery: WHERE salary > (SELECT AVG(salary) FROM employees). Show name and salary.',
            starterCode: '-- Employees above average salary (use a subquery)\n',
            solution: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
          },
          {
            instruction: 'Step 2: Write a multi-join query: join employees to departments and then departments to projects (on dept_id). Show employee name, department name, and project name. Only show Engineering employees.',
            starterCode: "-- Three-table join: employees → departments → projects (Engineering only)\n",
            solution: "SELECT e.name, d.name AS department, p.name AS project\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id\nINNER JOIN projects p ON d.id = p.dept_id\nWHERE d.name = 'Engineering';",
          },
          {
            instruction: 'Step 3: Write a complete business report: for each department, show the department name, number of employees (as headcount), average salary (as avg_salary), and total project budget (as project_budget). Join all three tables. Group by department name. Sort by headcount descending.',
            starterCode: '-- Full department report: headcount, avg salary, project budget\n',
            solution: 'SELECT d.name AS department, COUNT(DISTINCT e.id) AS headcount, AVG(e.salary) AS avg_salary, SUM(p.budget) AS project_budget\nFROM departments d\nINNER JOIN employees e ON e.dept_id = d.id\nINNER JOIN projects p ON p.dept_id = d.id\nGROUP BY d.name\nORDER BY headcount DESC;',
          },
        ],
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = sqlModule;
if (typeof window !== 'undefined') window.sqlModule = sqlModule;
