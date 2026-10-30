export const supportedLanguages = ['C', 'Python', 'C++', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL'];

export const lessons = [
  { language: 'C', level: 'Beginner', title: 'Introduction to C', summary: 'Understand variables, loops, and basic input/output.' },
  { language: 'Python', level: 'Beginner', title: 'Python Basics', summary: 'Learn syntax, conditions, and functions quickly.' },
  { language: 'C++', level: 'Intermediate', title: 'OOP in C++', summary: 'Understand classes, objects, and constructors.' },
  { language: 'Java', level: 'Intermediate', title: 'Java Core Concepts', summary: 'Explore methods, arrays, and exception handling.' },
  { language: 'JavaScript', level: 'Intermediate', title: 'DOM and Events', summary: 'Create interactive web pages with JavaScript.' },
  { language: 'SQL', level: 'Advanced', title: 'SQL Queries', summary: 'Write filtering, joins, and aggregation queries.' },
];

export const notes = [
  {
    id: 1,
    topic: 'C',
    title: 'Variables in C',
    difficulty: 'Basic',
    description: 'A variable stores data that can be used while the program runs.',
    definition: 'A memory location used to store a value.',
    example: 'int age = 20;'
  },
  {
    id: 2,
    topic: 'Loops',
    title: 'For Loop',
    difficulty: 'Basic',
    description: 'A for loop repeats a block of code a fixed number of times.',
    definition: 'A control structure used for repeated execution.',
    example: 'for (int i = 0; i < 5; i++) { printf("%d", i); }'
  },
  {
    id: 3,
    topic: 'Functions',
    title: 'Function Declaration',
    difficulty: 'Intermediate',
    description: 'Functions help organize code into reusable blocks.',
    definition: 'A named block of code that performs a task.',
    example: 'int sum(int a, int b) { return a + b; }'
  },
  {
    id: 4,
    topic: 'Arrays',
    title: 'One-Dimensional Arrays',
    difficulty: 'Intermediate',
    description: 'Arrays store multiple values of the same type under one name.',
    definition: 'A collection of data stored in contiguous memory.',
    example: 'int marks[5] = {10, 20, 30, 40, 50};'
  }
];

export const logicSteps = [
  { title: 'Understand the question', detail: 'Read the problem carefully and identify the goal.' },
  { title: 'Identify input and output', detail: 'Find what values are supplied and what result should be produced.' },
  { title: 'Identify variables', detail: 'Choose the variables required to store information during processing.' },
  { title: 'Develop logic', detail: 'Convert the requirement into clear decision-making steps.' },
  { title: 'Write an algorithm', detail: 'Arrange the steps in a step-by-step sequence.' },
  { title: 'Write pseudocode', detail: 'Use readable logic before converting into real code.' },
  { title: 'Draw a flowchart', detail: 'Represent logic visually to verify the process.' },
];

export const sampleCode = {
  c: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
  python: `total = 0
for i in range(1, 6):
    total += i
print(total)`,
  java: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
};

export const practiceChallenges = [
  {
    id: 'loop-sum',
    title: 'Loop Sum',
    level: 'Beginner',
    summary: 'Calculate the sum of numbers from 1 to N.',
    description: 'Read N and print the total of all integers from 1 to N.',
    sampleInput: '5',
    sampleOutput: '15',
    hint: 'Use a loop and keep adding the current value to a total variable.'
  },
  {
    id: 'even-check',
    title: 'Even or Odd',
    level: 'Beginner',
    summary: 'Check whether a number is even or odd.',
    description: 'Read a value and print whether it is Even or Odd.',
    sampleInput: '7',
    sampleOutput: 'Odd',
    hint: 'Use the modulus operator %.'
  },
  {
    id: 'max-array',
    title: 'Maximum in Array',
    level: 'Intermediate',
    summary: 'Find the largest number in an array.',
    description: 'Read an array of length n and print the maximum element.',
    sampleInput: '5\n8 2 9 1 5',
    sampleOutput: '9',
    hint: 'Track the largest value while scanning the array.'
  }
];

export const runtimeExamples = [
  {
    title: 'Loop starts',
    line: 'for (int i = 1; i <= 5; i++)',
    variables: { i: 1, sum: 0 },
    description: 'The loop begins with the first iteration and initializes the current value.'
  },
  {
    title: 'Add current value',
    line: 'sum += i;',
    variables: { i: 1, sum: 1 },
    description: 'The current loop value is added to the running total.'
  },
  {
    title: 'Next iteration',
    line: 'i++',
    variables: { i: 2, sum: 3 },
    description: 'The loop counter increases and the process repeats.'
  },
  {
    title: 'Program ends',
    line: 'printf("%d", sum);',
    variables: { i: 6, sum: 15 },
    description: 'The loop completes and the final value is printed to the console.'
  }
];

export const dashboardRows = [
  { label: 'Lessons completed', value: '18' },
  { label: 'Practice attempts', value: '42' },
  { label: 'Projects in progress', value: '3' },
  { label: 'Current streak', value: '7 days' },
];
