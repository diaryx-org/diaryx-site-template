---
title: The history of Diaryx
author: Adam Harris
audience:
  - public
  - interested in learning how Diaryx works
part_of: "[Diaryx](<diaryx.md>)"
---

# The History of Diaryx

Let's start at the beginning.

Computers store information as ones and zeros. A long time ago, people invented a code called ASCII that could translate sequences of ones and zeros to text.

For example,

| Binary   | Character |
| -------- | --------- |
| 01000001 | A         |
| 01000010 | B         |
| 01000011 | C         |

...and so on.

Each character, number, and symbol could be represented with a eight-digit set of ones and zeros. Ever since ASCII, people have been using letters and numbers to communicate with computers, crunch numbers, and store important data!

Nowadays, we have a new encoding format called UTF-8 that extends ASCII to support an even wider variety of characters, such as emoji and scripts from other languages.

## Okay, but what does this have to do with Diaryx?

I'm getting there!

There are probably millions of file formats out there. For images there is `png`, `jpg`, `heic`, `avif`, `gif`, and more. For documents there are `pdf`, `docx`, `odt`, `rtf`, and more.

Each of them were useful for different things, depending on what you wanted to use them for. Some of them could contain over kinds of files. Sometimes folders could have formats too!

When the Internet came along, a new file format was invented called `html`. It was really useful for displaying information in ways that conveyed meaning. For example, to emphasize a word, you could write `<i>words in angle-bracket tags</i>`. But what `html` was really useful for was transmitting linked messages across networks. One HTML tag, `<a>`, had the power to link to other files. An HTML viewer made these links easy to use: just one click and you could see the file instantly!

These are called **hyperlinks**. Here is an example that will take you [all the way to the top of the page!](#how-does-diaryx-work)

The Internet revolutionized the world! People started talking, storing, messaging, and purchasing online. However, HTML had significant limitations: it was awkward to write, and it had limited functionality.

In 2004, a man named John Gruber wanted to help solve the first problem, and invented a new format called [Markdown](https://daringfireball.net/projects/markdown/). He was a famous blogger, and wanted to write blog posts more easily. So he made a simple file format that could convert to HTML:

|       Markdown        |               HTML               | Output              |
| :-------------------: | :------------------------------: | ------------------- |
|      `*italic*`       |         `<i>italic</i>`          | _italic_            |
|      `**bold**`       |     `<strong>bold</strong>`      | **bold**            |
| `[link](example.com)` | `<a href="example.com">link</a>` | [link](example.com) |

Here are some of John Gruber's thoughts about Markdown's design. Read it carefully:

> The overriding design goal for Markdown’s formatting syntax is to make it **as readable as possible.** The idea is that a Markdown-formatted document **should be publishable as-is, as plain text,** without looking like it’s been marked up with tags or formatting instructions. While Markdown’s syntax has been influenced by several existing text-to-HTML filters, the single biggest source of inspiration for Markdown’s syntax is the format of plain text email.

(emphasis mine)

John Gruber's goal wasn't merely to make HTML easier to write. **It was to make plain text easy to read**— to use ASCII characters to represent semantic meaning.

Diaryx's design goal is similar, but not exactly the same.

## The design goal of Diaryx

Diaryx's design goal is also to make plain text as readable as possible, but for a greater purpose: **to help personal writing last forever.** Think of it:

- A markdown file, unlike other formats like `docx`, is easy to read without a specific program made for that file format. You can open a markdown file in any basic text editor and know exactly what it means.
- Markdown is getting more and more common, and has tons of tools. Markdown is powerful and can fulfill the purpose of most writing tools, as evidenced by the popularity of Markdown editors like Obsidian, Bear,
- Even if your preferred editor stops receiving updates, you can always find another editor.

But fulfilling the design goals of Diaryx requires more from Markdown than it originally had.

## "Frontmatter"

In many computer applications, it is immensely useful to be able to serialize and deserialize structured information. This is how HTML files would be sent from computer to computer. This has historically been one weakness of markdown— though beautiful to read, it wasn't very structured.

This has changed with the gradual adoption of `frontmatter` and YAML. YAML is a structured data format with a similar design goal to Markdown: to be as readable as possible. A markdown file with YAML frontmatter looks like this:

```
---
title: My document
author: John Johnson
date: 2025-10-10
---

# My document

Welcome to my document!
```

Notice the frontmatter at the beginning is surrounded by **three dashes** (`---`). Those are called **delimiters**. In between the delimiters is data in YAML format. It is very simple; you can store whatever kind of data you want!

In the example, John Johnson has given his document three **key values**. On the left of the colon is the key, and on the right of the colon is the value. In the example, the keys are `title`, `author`, and `date`, and the values are `My document`, `John Johnson`, and `2025-10-10`.

Historically, YAML frontmatter in markdown files was popularized by a common website creation software called _Jekyll_ around 2010. It would use certain values in the frontmatter— such as `title` and `date`— to turn markdown files into websites automatically.

## How Diaryx uses frontmatter

Diaryx has a [specification](diaryx-writing-specification) that defines specifically what keys it recognizes in YAML frontmatter.

(Under construction! Check back later for a completed page.)
