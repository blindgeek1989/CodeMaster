const pythonModule = {
  id: 'python',
  title: 'Python Fundamentals',
  description: 'Python is one of the most beginner-friendly and widely used programming languages in the world. It powers data science, automation, web servers, and more. We start from zero — no coding experience needed.',
  objectives: [
    'Understand what Python is and where it is used',
    'Write and run Python programs using print() and comments',
    'Store information in variables and understand data types',
    'Manipulate text with Python string methods and f-strings',
    'Work with ordered collections of data using lists',
    'Make decisions in code using if, elif, and else',
    'Repeat actions automatically using for and while loops',
    'Write reusable blocks of code using functions',
    'Store key-value pairs using dictionaries',
    'Handle errors gracefully using try and except',
  ],
  goals: [
    'Write a Python program that outputs text to the screen',
    'Create variables of different data types and print them',
    'Build a list, add to it, and loop through it',
    'Write a function that takes inputs and returns a result',
    'Use a dictionary to store and look up information',
    'Handle an error so the program does not crash',
  ],
  lessons: [
    {
      id: 'py-1',
      title: 'Lesson 1: What Is Python?',
      content: `Python is a programming language. A programming language is a way to give instructions to a computer. Python is one of the most popular languages in the world because it is readable, beginner-friendly, and powerful.

WHERE IS PYTHON USED?
  Data science and machine learning (used by scientists and researchers)
  Automation (writing scripts that do repetitive tasks automatically)
  Web servers (the back end of websites like Instagram was originally built in Python)
  Scientific computing and research
  Desktop tools and utilities

WHAT PYTHON CODE LOOKS LIKE
Python is designed to read almost like English. Here is a simple Python program:

print("Hello, world!")

That single line tells the computer: print the text "Hello, world!" to the screen.

Compare this to what the same thing looks like in some other languages — Python is much shorter and cleaner.

COMMENTS
A comment is a note in your code that the computer ignores. Comments start with a #:

# This is a comment — the computer skips this line
print("Hello!")   # This prints to the screen

Comments are for humans reading the code. They explain WHY something is done, not just WHAT the code does.

HOW PYTHON RUNS
When you run a Python program, Python reads your instructions line by line, from top to bottom, and executes each one. If Python does not understand a line, it stops and shows an error message.

Error messages are not failures — they are Python's way of telling you exactly what went wrong and on which line. Every programmer, no matter how experienced, reads error messages every day.

PYTHON AND ACCESSIBILITY
Python is text-based. Every Python program is a plain text file. Screen readers can read Python code just as well as any other text. There are no visual drag-and-drop elements — everything you do is with the keyboard. This makes Python an excellent language for blind and low-vision programmers.`,
      quiz: [
        {
          question: 'What does print("Hello") do in Python?',
          options: [
            'It opens a printer and prints the word Hello on paper',
            'It outputs the text Hello to the screen',
            'It saves Hello to a file',
            'It stores Hello in a variable',
          ],
          answer: 1,
        },
        {
          question: 'What does a # symbol do at the start of a line in Python?',
          options: [
            'It makes the line run twice',
            'It causes a syntax error',
            'It marks the line as a comment — Python ignores it when running the program',
            'It prints a hashtag to the screen',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Write a Python comment. Type a line starting with # that says "My first Python program".',
            starterCode: '# Write your comment on the next line\n',
            solution: '# My first Python program\n',
          },
          {
            instruction: 'Step 2: Now add a print() statement below your comment. Make it output the text: Hello, Python!',
            starterCode: '# My first Python program\n# Add your print() below\n',
            solution: '# My first Python program\nprint("Hello, Python!")\n',
            expectedOutput: 'Hello, Python!',
          },
          {
            instruction: 'Step 3: Add a second print() below the first one that outputs: I am learning to code.',
            starterCode: '# My first Python program\nprint("Hello, Python!")\n# Add your second print() below\n',
            solution: '# My first Python program\nprint("Hello, Python!")\nprint("I am learning to code.")\n',
            expectedOutput: 'Hello, Python!\nI am learning to code.',
          },
        ],
      },
    },
    {
      id: 'py-2',
      title: 'Lesson 2: Your First Python Program',
      content: `In this lesson we go deeper into the basics of writing Python programs: print(), multiple lines of output, and how Python handles indentation.

THE print() FUNCTION
print() outputs text to the screen. You can print:
  A string (text in quotes):    print("Hello")
  A number:                     print(42)
  Nothing (a blank line):       print()
  Multiple things at once:      print("Score:", 100)

STRINGS
A string is any piece of text. In Python, strings are surrounded by quotes. You can use single quotes or double quotes — they mean the same thing:
  print("Hello")
  print('Hello')

If your string contains an apostrophe, use double quotes to avoid confusion:
  print("It's working!")

MULTIPLE OUTPUTS
print() always ends with a newline — the cursor moves to the next line after printing. To print multiple lines, call print() multiple times:

print("Line one")
print("Line two")
print("Line three")

Output:
Line one
Line two
Line three

PRINT WITH A CUSTOM SEPARATOR
By default, print("Hello", "world") outputs: Hello world (with a space between). You can change the separator with sep=:
  print("Hello", "world", sep="-")   # Hello-world
  print("A", "B", "C", sep=", ")     # A, B, C

PRINT WITHOUT A NEWLINE
By default print() adds a newline at the end. Use end= to change this:
  print("Hello, ", end="")
  print("world!")
  # Output: Hello, world!

INDENTATION IN PYTHON
Python uses indentation (spaces at the start of a line) to define structure. You will use this when we get to if statements and loops. For now, do not indent your lines unless instructed — top-level code starts at column 0.`,
      quiz: [
        {
          question: 'What does print("A", "B", sep="-") output?',
          options: ['A B', 'A-B', '"A"-"B"', 'A, B'],
          answer: 1,
        },
        {
          question: 'If you call print() three times, each with a different string, how many lines appear in the output?',
          options: [
            'One line, with all three strings joined together',
            'Three lines — each print() starts on a new line by default',
            'It depends on the length of the strings',
            'Python only allows one print() per program',
          ],
          answer: 1,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Print three lines: your favourite colour, your favourite number (as text, e.g. "7"), and your favourite food. Each on its own line using separate print() calls.',
            starterCode: '# Print your three favourites below\n',
            solution: 'print("Blue")\nprint("7")\nprint("Pizza")\n',
          },
          {
            instruction: 'Step 2: Use print() with sep= to print "Python", "is", "awesome" separated by underscores on a single line.',
            starterCode: '# Use sep= to join the words with underscores\n',
            solution: 'print("Python", "is", "awesome", sep="_")\n',
            expectedOutput: 'Python_is_awesome',
          },
          {
            instruction: 'Step 3: Print "Loading" followed by three dots on the same line using end="" to suppress the newlines, then print a final "Done!" on a new line.',
            starterCode: '# Print "Loading..." then "Done!" — the dots should appear on the same line as Loading\n',
            solution: 'print("Loading", end="")\nprint(".", end="")\nprint(".", end="")\nprint(".")\nprint("Done!")\n',
            expectedOutput: 'Loading...\nDone!',
          },
        ],
      },
    },
    {
      id: 'py-3',
      title: 'Lesson 3: Variables and Data Types',
      content: `A variable is a named container for a value. Instead of writing the same value over and over, you store it once in a variable and use the name everywhere else.

CREATING A VARIABLE
In Python, you create a variable by writing: name = value

  age = 30
  name = "Alice"
  score = 98.5

The = sign means "assign this value to this variable." It is not testing equality (we use == for that later).

VARIABLE NAMES
  Must start with a letter or underscore (_)
  Can contain letters, numbers, and underscores
  Cannot contain spaces or hyphens
  Are case-sensitive: age, Age, and AGE are three different variables
  Should describe what they store: use first_name, not fn or x

PYTHON'S FOUR BASIC DATA TYPES
1. str (string) — text
   name = "Alice"
   greeting = 'Hello, world!'

2. int (integer) — whole numbers, positive or negative
   age = 30
   temperature = -5
   year = 2026

3. float (floating-point) — numbers with decimal points
   price = 19.99
   pi = 3.14159

4. bool (boolean) — True or False (capital T and F)
   is_logged_in = True
   has_errors = False

CHECKING THE TYPE
type() tells you what type a value is:
  print(type("hello"))    # <class 'str'>
  print(type(42))         # <class 'int'>
  print(type(3.14))       # <class 'float'>
  print(type(True))       # <class 'bool'>

USING VARIABLES IN PRINT
  name = "Alice"
  age = 30
  print(name)        # Alice
  print(age)         # 30
  print(name, age)   # Alice 30

CHANGING A VARIABLE
You can reassign a variable at any time:
  score = 0
  score = 50    # score is now 50
  score = 100   # score is now 100`,
      quiz: [
        {
          question: 'Which of these is a valid Python variable name?',
          options: ['2nd_place', 'first-name', 'my_score', 'class'],
          answer: 2,
        },
        {
          question: 'What data type is the value True in Python?',
          options: ['str', 'int', 'float', 'bool'],
          answer: 3,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a variable called city and assign it the string value "London". Then print it.',
            starterCode: '# Create a city variable and print it\n',
            solution: 'city = "London"\nprint(city)\n',
            expectedOutput: 'London',
          },
          {
            instruction: 'Step 2: Create an int variable called year with the value 2026, and a float variable called temperature with the value 18.5. Print both.',
            starterCode: '# Create year and temperature variables and print them\n',
            solution: 'year = 2026\ntemperature = 18.5\nprint(year)\nprint(temperature)\n',
            expectedOutput: '2026\n18.5',
          },
          {
            instruction: 'Step 3: Use type() to print the type of each of these three values on separate lines: "hello", 42, and 3.14.',
            starterCode: '# Print the type of each value\n',
            solution: 'print(type("hello"))\nprint(type(42))\nprint(type(3.14))\n',
            expectedOutput: "<class 'str'>\n<class 'int'>\n<class 'float'>",
          },
        ],
      },
    },
    {
      id: 'py-4',
      title: 'Lesson 4: Working with Strings',
      content: `Strings are everywhere in programming — usernames, messages, file names, web pages. Python has powerful built-in tools for working with text.

COMBINING STRINGS (CONCATENATION)
Use + to join strings:
  first = "Alice"
  last = "Smith"
  full = first + " " + last
  print(full)   # Alice Smith

F-STRINGS (THE MODERN WAY)
F-strings let you embed variables directly into a string. Put f before the opening quote, then use {} around the variable:
  name = "Alice"
  age = 30
  print(f"My name is {name} and I am {age} years old.")
  # My name is Alice and I am 30 years old.

You can put any Python expression inside {}:
  print(f"Two plus two is {2 + 2}")   # Two plus two is 4

COMMON STRING METHODS
A method is a function attached to a value. Call it with a dot:

  text = "  hello, world!  "

  text.upper()       # "  HELLO, WORLD!  "  — all uppercase
  text.lower()       # "  hello, world!  "  — all lowercase
  text.strip()       # "hello, world!"      — removes leading/trailing whitespace
  text.replace("world", "Python")           # "  hello, Python!  "
  text.split(", ")   # ["  hello", "world!  "] — splits into a list

THE len() FUNCTION
len() counts the characters in a string (including spaces):
  word = "Python"
  print(len(word))   # 6

CHECKING WHAT'S IN A STRING
  "hello" in "hello, world"    # True
  "bye" in "hello, world"      # False

INDEXING AND SLICING
Each character in a string has an index starting at 0:
  word = "Python"
  word[0]    # "P"  (first character)
  word[-1]   # "n"  (last character)
  word[0:3]  # "Pyt" (characters 0, 1, 2)`,
      quiz: [
        {
          question: 'What does "hello".upper() return?',
          options: ['"Hello"', '"HELLO"', '"hello"', 'An error'],
          answer: 1,
        },
        {
          question: 'Given name = "Alice", which f-string correctly outputs "Hello, Alice!"?',
          options: [
            'f"Hello, name!"',
            '"Hello, {name}!"',
            'f"Hello, {name}!"',
            'f"Hello, " + name + "!"',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a variable called message with the value "  Welcome to Python!  " (with spaces around it). Print it after calling .strip() to remove the surrounding whitespace.',
            starterCode: 'message = "  Welcome to Python!  "\n# Print message after stripping whitespace\n',
            solution: 'message = "  Welcome to Python!  "\nprint(message.strip())\n',
            expectedOutput: 'Welcome to Python!',
          },
          {
            instruction: 'Step 2: Create variables first_name = "Ada" and last_name = "Lovelace". Use an f-string to print: "Full name: Ada Lovelace".',
            starterCode: 'first_name = "Ada"\nlast_name = "Lovelace"\n# Use an f-string to print the full name\n',
            solution: 'first_name = "Ada"\nlast_name = "Lovelace"\nprint(f"Full name: {first_name} {last_name}")\n',
            expectedOutput: 'Full name: Ada Lovelace',
          },
          {
            instruction: 'Step 3: Given the string "Python is great", use len() to print its length, and print the first and last characters using indexing.',
            starterCode: 'text = "Python is great"\n# Print: length of text, first character, last character\n',
            solution: 'text = "Python is great"\nprint(len(text))\nprint(text[0])\nprint(text[-1])\n',
            expectedOutput: '16\nP\nt',
          },
        ],
      },
    },
    {
      id: 'py-5',
      title: 'Lesson 5: Lists',
      content: `A list is an ordered collection of values. Instead of creating five separate variables (item1, item2, item3...), you store them in one list.

CREATING A LIST
Use square brackets [], with items separated by commas:
  colours = ["red", "green", "blue"]
  scores = [95, 82, 67, 100]
  mixed = ["Alice", 30, True]   # lists can hold different types

AN EMPTY LIST
  items = []

ACCESSING ITEMS (INDEXING)
Each item has an index starting at 0:
  fruits = ["apple", "banana", "cherry"]
  fruits[0]    # "apple"
  fruits[1]    # "banana"
  fruits[-1]   # "cherry" (last item)
  fruits[-2]   # "banana" (second to last)

CHANGING AN ITEM
  fruits[0] = "mango"   # replaces "apple" with "mango"

COMMON LIST METHODS
  fruits.append("kiwi")       # adds "kiwi" to the end
  fruits.insert(1, "grape")   # inserts "grape" at index 1
  fruits.remove("banana")     # removes the first occurrence of "banana"
  fruits.pop()                # removes and returns the last item
  fruits.pop(0)               # removes and returns the item at index 0
  fruits.sort()               # sorts the list in place (alphabetical/numeric)
  fruits.reverse()            # reverses the list in place

LENGTH OF A LIST
  len(fruits)   # number of items in the list

LOOPING THROUGH A LIST
A for loop repeats code once for each item:
  for fruit in fruits:
      print(fruit)

Note the colon at the end of the for line, and the indentation (4 spaces) on the next line. Python requires this.

CHECKING IF AN ITEM IS IN A LIST
  "apple" in fruits    # True or False`,
      quiz: [
        {
          question: 'Given colours = ["red", "green", "blue"], what is colours[-1]?',
          options: ['"red"', '"green"', '"blue"', 'An error'],
          answer: 2,
        },
        {
          question: 'What method adds an item to the END of a list?',
          options: ['insert()', 'add()', 'append()', 'push()'],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a list called languages with three items: "Python", "HTML", "CSS". Print the full list, then print just the first item.',
            starterCode: '# Create the languages list, print it, then print the first item\n',
            solution: 'languages = ["Python", "HTML", "CSS"]\nprint(languages)\nprint(languages[0])\n',
            expectedOutput: "['Python', 'HTML', 'CSS']\nPython",
          },
          {
            instruction: 'Step 2: Append "JavaScript" to the languages list. Then print the length of the list using len().',
            starterCode: 'languages = ["Python", "HTML", "CSS"]\n# Append JavaScript and print the new length\n',
            solution: 'languages = ["Python", "HTML", "CSS"]\nlanguages.append("JavaScript")\nprint(len(languages))\n',
            expectedOutput: '4',
          },
          {
            instruction: 'Step 3: Use a for loop to print each language in the list on its own line.',
            starterCode: 'languages = ["Python", "HTML", "CSS", "JavaScript"]\n# Loop through and print each language\n',
            solution: 'languages = ["Python", "HTML", "CSS", "JavaScript"]\nfor language in languages:\n    print(language)\n',
            expectedOutput: 'Python\nHTML\nCSS\nJavaScript',
          },
        ],
      },
    },
    {
      id: 'py-6',
      title: 'Lesson 6: Making Decisions',
      content: `Programs need to make decisions. Should this user see the admin panel? Is the password long enough? Did the quiz answer match? You express decisions in code using if, elif, and else.

THE if STATEMENT
if tests a condition. If the condition is True, the indented code runs. If False, it is skipped:

  age = 20
  if age >= 18:
      print("You can vote.")

THE else CLAUSE
else runs when the if condition is False:

  age = 15
  if age >= 18:
      print("You can vote.")
  else:
      print("You cannot vote yet.")

THE elif CLAUSE
elif (else if) tests another condition if the first was False:

  score = 75
  if score >= 90:
      print("Grade: A")
  elif score >= 80:
      print("Grade: B")
  elif score >= 70:
      print("Grade: C")
  else:
      print("Grade: F")

Python checks each condition in order and runs only the first matching block.

COMPARISON OPERATORS
  ==   equal to                 5 == 5    # True
  !=   not equal to             5 != 3    # True
  >    greater than             10 > 5    # True
  <    less than                3 < 10    # True
  >=   greater than or equal    5 >= 5    # True
  <=   less than or equal       4 <= 10   # True

BOOLEAN OPERATORS
Combine conditions with and, or, not:
  age = 20
  has_id = True

  if age >= 18 and has_id:
      print("Entry allowed.")

  if age < 13 or age > 65:
      print("Special pricing applies.")

  if not has_id:
      print("Please show ID.")

SHORT-HAND: TERNARY EXPRESSION
  status = "adult" if age >= 18 else "minor"`,
      quiz: [
        {
          question: 'Python checks elif conditions in what order?',
          options: [
            'All at once, running every matching block',
            'In order from top to bottom — it stops at the first True condition',
            'From bottom to top',
            'Randomly',
          ],
          answer: 1,
        },
        {
          question: 'What does the == operator do?',
          options: [
            'Assigns a value to a variable',
            'Tests whether two values are equal — returns True or False',
            'Adds two numbers',
            'Checks if a variable exists',
          ],
          answer: 1,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Write an if/else statement. Given temperature = 35, print "It is hot" if temperature is greater than 30, otherwise print "It is cool".',
            starterCode: 'temperature = 35\n# Write your if/else here\n',
            solution: 'temperature = 35\nif temperature > 30:\n    print("It is hot")\nelse:\n    print("It is cool")\n',
            expectedOutput: 'It is hot',
          },
          {
            instruction: 'Step 2: Given score = 72, use if/elif/else to print the grade: 90+ = "A", 80+ = "B", 70+ = "C", below 70 = "F".',
            starterCode: 'score = 72\n# Write your if/elif/else grade check here\n',
            solution: 'score = 72\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 70:\n    print("C")\nelse:\n    print("F")\n',
            expectedOutput: 'C',
          },
          {
            instruction: 'Step 3: Given is_member = True and age = 25, print "Welcome, member!" if both conditions are true (is_member is True AND age >= 18). Otherwise print "Access denied.".',
            starterCode: 'is_member = True\nage = 25\n# Use and to combine both conditions\n',
            solution: 'is_member = True\nage = 25\nif is_member and age >= 18:\n    print("Welcome, member!")\nelse:\n    print("Access denied.")\n',
            expectedOutput: 'Welcome, member!',
          },
        ],
      },
    },
    {
      id: 'py-7',
      title: 'Lesson 7: Loops',
      content: `Loops repeat code automatically. Instead of writing print() 100 times, you write it once inside a loop and tell Python to run it 100 times.

THE for LOOP WITH range()
range() generates a sequence of numbers. for loops through each one:

  for i in range(5):
      print(i)
  # Prints: 0, 1, 2, 3, 4

  range(1, 6)     # 1, 2, 3, 4, 5 (start inclusive, end exclusive)
  range(0, 10, 2) # 0, 2, 4, 6, 8 (start, end, step)

THE for LOOP OVER A LIST
You already saw this in the Lists lesson:
  names = ["Alice", "Bob", "Carol"]
  for name in names:
      print(f"Hello, {name}!")

ENUMERATE — INDEX AND VALUE TOGETHER
  fruits = ["apple", "banana", "cherry"]
  for i, fruit in enumerate(fruits):
      print(f"{i}: {fruit}")
  # 0: apple
  # 1: banana
  # 2: cherry

THE while LOOP
while repeats as long as a condition is True:

  count = 0
  while count < 5:
      print(count)
      count += 1   # count = count + 1
  # Prints: 0, 1, 2, 3, 4

Warning: if the condition never becomes False, the loop runs forever (an infinite loop). Always make sure something changes inside the loop.

break — STOP THE LOOP EARLY
  for i in range(10):
      if i == 5:
          break         # exits the loop when i reaches 5
      print(i)          # prints 0, 1, 2, 3, 4

continue — SKIP THIS ITERATION
  for i in range(6):
      if i == 3:
          continue      # skips the rest of the loop body for i = 3
      print(i)          # prints 0, 1, 2, 4, 5`,
      quiz: [
        {
          question: 'What does range(2, 8, 2) produce?',
          options: ['2, 4, 6, 8', '2, 4, 6', '0, 2, 4, 6, 8', '2, 3, 4, 5, 6, 7'],
          answer: 1,
        },
        {
          question: 'What keyword immediately exits a loop, skipping all remaining iterations?',
          options: ['stop', 'exit', 'break', 'return'],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Use a for loop with range() to print the numbers 1 through 5, each on its own line.',
            starterCode: '# Use range() to print 1, 2, 3, 4, 5\n',
            solution: 'for i in range(1, 6):\n    print(i)\n',
            expectedOutput: '1\n2\n3\n4\n5',
          },
          {
            instruction: 'Step 2: Use enumerate() to loop over the list ["red", "green", "blue"] and print each item with its index in the format "0: red", "1: green", "2: blue".',
            starterCode: 'colours = ["red", "green", "blue"]\n# Use enumerate to print index and value\n',
            solution: 'colours = ["red", "green", "blue"]\nfor i, colour in enumerate(colours):\n    print(f"{i}: {colour}")\n',
            expectedOutput: '0: red\n1: green\n2: blue',
          },
          {
            instruction: 'Step 3: Use a for loop over range(10) with a continue statement to skip all odd numbers, printing only the even numbers from 0 to 8.',
            starterCode: '# Loop 0-9, skip odd numbers, print even numbers only\n',
            solution: 'for i in range(10):\n    if i % 2 != 0:\n        continue\n    print(i)\n',
            expectedOutput: '0\n2\n4\n6\n8',
          },
        ],
      },
    },
    {
      id: 'py-8',
      title: 'Lesson 8: Functions',
      content: `A function is a named, reusable block of code. Instead of writing the same logic multiple times throughout your program, you write it once in a function and call it by name whenever you need it.

DEFINING A FUNCTION
Use the def keyword, followed by the function name, parentheses, and a colon. The function body is indented:

  def greet():
      print("Hello!")

CALLING A FUNCTION
Write the function name followed by parentheses:
  greet()   # Hello!

The function does nothing until you call it.

PARAMETERS — PASSING DATA IN
Parameters are placeholders inside the parentheses that receive values when the function is called:

  def greet(name):
      print(f"Hello, {name}!")

  greet("Alice")   # Hello, Alice!
  greet("Bob")     # Hello, Bob!

MULTIPLE PARAMETERS
  def add(a, b):
      print(a + b)

  add(3, 5)    # 8
  add(10, 20)  # 30

DEFAULT PARAMETER VALUES
If a caller does not provide a value, the default is used:

  def greet(name, greeting="Hello"):
      print(f"{greeting}, {name}!")

  greet("Alice")            # Hello, Alice!
  greet("Bob", "Welcome")   # Welcome, Bob!

THE return STATEMENT
return sends a value back to the caller. Without return, a function returns None:

  def add(a, b):
      return a + b

  result = add(3, 5)
  print(result)   # 8

You can store the returned value, print it, or use it in further calculations.

DOCSTRINGS — DOCUMENTING A FUNCTION
A docstring is a string at the very start of a function body that describes what it does:

  def celsius_to_fahrenheit(c):
      """Convert Celsius to Fahrenheit."""
      return (c * 9/5) + 32

  print(celsius_to_fahrenheit(0))    # 32.0
  print(celsius_to_fahrenheit(100))  # 212.0`,
      quiz: [
        {
          question: 'What does the return statement do?',
          options: [
            'It prints a value to the screen',
            'It stops the program from running',
            'It sends a value back to whoever called the function',
            'It defines the function name',
          ],
          answer: 2,
        },
        {
          question: 'What happens if a function has no return statement?',
          options: [
            'Python throws an error',
            'The function returns 0',
            'The function returns None',
            'The function returns an empty string',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Define a function called say_hello that takes one parameter called name and prints "Hello, {name}!". Then call it with the argument "World".',
            starterCode: '# Define say_hello and call it with "World"\n',
            solution: 'def say_hello(name):\n    print(f"Hello, {name}!")\n\nsay_hello("World")\n',
            expectedOutput: 'Hello, World!',
          },
          {
            instruction: 'Step 2: Define a function called multiply that takes two parameters a and b, and returns a * b. Print the result of calling multiply(6, 7).',
            starterCode: '# Define multiply(a, b) that returns a * b, then print multiply(6, 7)\n',
            solution: 'def multiply(a, b):\n    return a * b\n\nprint(multiply(6, 7))\n',
            expectedOutput: '42',
          },
          {
            instruction: 'Step 3: Define a function called celsius_to_fahrenheit with a docstring "Convert Celsius to Fahrenheit." It should take a parameter c and return (c * 9/5) + 32. Print the result of calling it with 0 and with 100.',
            starterCode: '# Define celsius_to_fahrenheit with a docstring, then print results for 0 and 100\n',
            solution: 'def celsius_to_fahrenheit(c):\n    """Convert Celsius to Fahrenheit."""\n    return (c * 9/5) + 32\n\nprint(celsius_to_fahrenheit(0))\nprint(celsius_to_fahrenheit(100))\n',
            expectedOutput: '32.0\n212.0',
          },
        ],
      },
    },
    {
      id: 'py-9',
      title: 'Lesson 9: Dictionaries',
      content: `A dictionary stores key-value pairs. Instead of accessing data by position (like a list), you access it by a meaningful name (the key). Think of it like a real dictionary: you look up a word (the key) to find its definition (the value).

CREATING A DICTIONARY
Use curly braces {} with key: value pairs separated by commas:

  person = {
      "name": "Alice",
      "age": 30,
      "city": "London"
  }

Keys are usually strings. Values can be any type.

ACCESSING VALUES
Use the key in square brackets:
  person["name"]   # "Alice"
  person["age"]    # 30

Or use .get() which returns None (not an error) if the key does not exist:
  person.get("email")          # None
  person.get("email", "N/A")   # "N/A" (default value)

ADDING AND UPDATING ITEMS
  person["email"] = "alice@example.com"   # adds new key
  person["age"] = 31                      # updates existing key

REMOVING ITEMS
  del person["city"]           # removes the key entirely
  person.pop("email")          # removes and returns the value

CHECKING IF A KEY EXISTS
  "name" in person    # True
  "phone" in person   # False

USEFUL DICTIONARY METHODS
  person.keys()      # dict_keys(["name", "age", "city"])
  person.values()    # dict_values(["Alice", 30, "London"])
  person.items()     # dict_items([("name", "Alice"), ("age", 30), ...])

LOOPING THROUGH A DICTIONARY
  for key, value in person.items():
      print(f"{key}: {value}")

LENGTH
  len(person)   # number of key-value pairs`,
      quiz: [
        {
          question: 'Given data = {"x": 10}, what does data.get("y", 0) return?',
          options: [
            'An error because "y" does not exist',
            'None',
            '0 — the default value provided to .get()',
            '10',
          ],
          answer: 2,
        },
        {
          question: 'How do you add a new key "email" with value "a@b.com" to a dictionary called user?',
          options: [
            'user.add("email", "a@b.com")',
            'user["email"] = "a@b.com"',
            'user.insert("email", "a@b.com")',
            'user.append({"email": "a@b.com"})',
          ],
          answer: 1,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Create a dictionary called book with three keys: "title" = "Python Basics", "author" = "Ada", and "year" = 2026. Print the value of the "title" key.',
            starterCode: '# Create the book dictionary and print the title\n',
            solution: 'book = {"title": "Python Basics", "author": "Ada", "year": 2026}\nprint(book["title"])\n',
            expectedOutput: 'Python Basics',
          },
          {
            instruction: 'Step 2: Add a new key "pages" with value 200 to the book dictionary. Then print the length of the dictionary.',
            starterCode: 'book = {"title": "Python Basics", "author": "Ada", "year": 2026}\n# Add "pages": 200 and print the length\n',
            solution: 'book = {"title": "Python Basics", "author": "Ada", "year": 2026}\nbook["pages"] = 200\nprint(len(book))\n',
            expectedOutput: '4',
          },
          {
            instruction: 'Step 3: Loop through the book dictionary using .items() and print each key-value pair in the format "key: value".',
            starterCode: 'book = {"title": "Python Basics", "author": "Ada", "year": 2026, "pages": 200}\n# Loop through items and print each key: value\n',
            solution: 'book = {"title": "Python Basics", "author": "Ada", "year": 2026, "pages": 200}\nfor key, value in book.items():\n    print(f"{key}: {value}")\n',
            expectedOutput: 'title: Python Basics\nauthor: Ada\nyear: 2026\npages: 200',
          },
        ],
      },
    },
    {
      id: 'py-10',
      title: 'Lesson 10: Error Handling',
      content: `Errors are a normal part of programming. When Python cannot execute a line of code, it raises an exception — an error object that describes what went wrong. Without error handling, one unexpected input can crash your entire program. With error handling, you can catch the error, show a helpful message, and keep going.

TYPES OF COMMON ERRORS
  ValueError      — wrong type of value (e.g., int("abc"))
  TypeError       — wrong type for an operation (e.g., "hello" + 5)
  ZeroDivisionError — dividing by zero (e.g., 10 / 0)
  FileNotFoundError — trying to open a file that does not exist
  KeyError        — accessing a dictionary key that does not exist
  IndexError      — accessing a list index that does not exist

THE try / except BLOCK
Wrap risky code in a try block. If an exception occurs, Python jumps to the except block instead of crashing:

  try:
      result = 10 / 0
  except ZeroDivisionError:
      print("Cannot divide by zero!")

CATCHING MULTIPLE EXCEPTION TYPES
  try:
      number = int("abc")
  except ValueError:
      print("That is not a valid number.")
  except TypeError:
      print("Wrong type entirely.")

CATCHING ANY EXCEPTION
Use except Exception as e to catch everything and inspect the error:

  try:
      result = 10 / 0
  except Exception as e:
      print(f"An error occurred: {e}")

THE else CLAUSE
The else block runs only if no exception occurred:

  try:
      result = 10 / 2
  except ZeroDivisionError:
      print("Error!")
  else:
      print(f"Result: {result}")   # runs because no exception

THE finally CLAUSE
finally always runs — whether an exception occurred or not. Used for cleanup (closing files, connections):

  try:
      f = open("data.txt")
      data = f.read()
  except FileNotFoundError:
      print("File not found.")
  finally:
      print("Done attempting to read the file.")

RAISING YOUR OWN EXCEPTIONS
You can raise exceptions yourself with raise:

  def set_age(age):
      if age < 0:
          raise ValueError("Age cannot be negative.")
      return age

  try:
      set_age(-5)
  except ValueError as e:
      print(e)   # Age cannot be negative.`,
      quiz: [
        {
          question: 'What happens if an exception occurs inside a try block and there is a matching except clause?',
          options: [
            'The program crashes and shows a traceback',
            'Python skips the rest of the try block and runs the except block instead',
            'Python retries the try block until it succeeds',
            'The exception is silently ignored',
          ],
          answer: 1,
        },
        {
          question: 'When does the finally block run?',
          options: [
            'Only when no exception occurs',
            'Only when an exception occurs',
            'Always — whether an exception occurred or not',
            'Only when explicitly called with finally()',
          ],
          answer: 2,
        },
      ],
      exercise: {
        steps: [
          {
            instruction: 'Step 1: Write a try/except block that tries to convert the string "not_a_number" to an integer using int(). Catch the ValueError and print "Invalid input: not a number."',
            starterCode: '# Try to convert "not_a_number" to int, catch ValueError\n',
            solution: 'try:\n    number = int("not_a_number")\nexcept ValueError:\n    print("Invalid input: not a number.")\n',
            expectedOutput: 'Invalid input: not a number.',
          },
          {
            instruction: 'Step 2: Write a try/except/else block. Try to divide 100 by 0. Catch ZeroDivisionError and print "Cannot divide by zero." Add an else block that prints the result (this will not run for this input).',
            starterCode: '# Try 100 / 0, catch ZeroDivisionError, add else for success case\n',
            solution: 'try:\n    result = 100 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero.")\nelse:\n    print(f"Result: {result}")\n',
            expectedOutput: 'Cannot divide by zero.',
          },
          {
            instruction: 'Step 3: Define a function called safe_divide(a, b). It should return a / b, but raise a ValueError with the message "Cannot divide by zero." if b is 0. Call it inside a try/except block with a=10, b=0, and print the error message.',
            starterCode: '# Define safe_divide, then call it with 10, 0 inside try/except\n',
            solution: 'def safe_divide(a, b):\n    if b == 0:\n        raise ValueError("Cannot divide by zero.")\n    return a / b\n\ntry:\n    result = safe_divide(10, 0)\nexcept ValueError as e:\n    print(e)\n',
            expectedOutput: 'Cannot divide by zero.',
          },
        ],
      },
    },
  ],
};

if (typeof module !== 'undefined') module.exports = pythonModule;
if (typeof window !== 'undefined') window.pythonModule = pythonModule;
