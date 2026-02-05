---
title: Diaryx Writing Specification
author: Adam Harris
audience:
  - public
  - Digital journal users
  - PKMS users
  - Markdown users
created: 2025-08-28T01:17:34+00:00
updated: 2025-10-13T09:29:44-06:00
format: "[Diaryx v0.8.0](https://spec.diaryx.org)"
reachable: "[Diaryx Spec Github Repo](https://github.com/adammharris/diaryx-specification)"
copying: "[Creative Commons Attribution-Sharealike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)"
version: v0.8.0
part_of: "[Diaryx](<diaryx.md>)"
---

# Diaryx Writing Specification

The Diaryx Writing Format is a specific method of digital writing that makes the writing process easier and more effective. It is meant to be both human-readable and machine-parseable.

## 0.1 Example

Imagine you open a file or folder without any prior context. How would you understand the content of the file?

If the file was in Diaryx format, the reader would see something like this:

```Markdown
---
title: Thoughts about stuff
author: John Doe
audience:
- family
- friends
created: 2025-08-25T16:24:16-06:00
updated: 2025-08-25T16:24:16-06:00
format: "[Diaryx v0.8.0](https://spec.diaryx.org)"
reachable: johndoe@email.com
part_of: "[My journal](<Journal entries.md>)"
---

# Thoughts about stuff

Today I had thoughts about stuff…
```

Now the reader knows:
- that this entry is appropriate to share with family
- that this particular entry is in CommonMark format
- that this entry is part of a larger group of entries, as is evident in the `part_of` attribute
- That the author of the  can be reached at "johndoe@email.com"

All of this information is clear and understandable even to someone who only has a plain text viewer and does not know YAML or markdown.

But what if I don't want to read boring plain text? Fortunately, because Diaryx uses structured markup and metadata, it is very easy to convert it to more visually pleasing formats:

![](<Diaryx Specification Example Image.png>)

## 0.2 Purpose

The purpose of writing is to connect the reader with the author. The Diaryx Writing Format is unique in that it places this purpose front and center. Each Diaryx document requires the author to specify the following properties:

1. `title`: a short summary of the document
2. `author`: the identity of the writer(s) of the document
3. `audience`: the identity of the audience/reader(s) of the document

Requiring explicit definitions for these values makes writing easier and more productive for the author:

- Authors plan their writing more effectively when they are required to specify what they are writing about (title) and who they are writing to (visibility).
- Authors find it easier to write when they constantly have the purpose of their writing in view— less writer's block and more writing.
- Authors and coauthors find it easier to review writing when they can quickly grasp the context of the writing, without trying to search for it in the body of the text.

It also makes writing easier to understand and more impactful for the reader:

- Readers find it easier to know whether to read or not when the purpose and context of the writing is immediately clear.
- Readers find it easier to understand the writing as they read because the purpose of the writing is constantly visible.
- Readers find it easier to revisit and share the content afterward, because it is very clear what the content is and where and to whom it is accessible.

The way Diaryx accomplishes this is simple and compatible with widely-accepted standards: a Diaryx file is simply a Markdown file with YAML frontmatter. Markdown is a widely used markup format, and YAML frontmatter is a common standard for Markdown files, widely recognized in tools such as Pandoc and GitHub. So, the Diaryx Writing Format is perhaps best understood as a YAML frontmatter schema and a collection of best practices.

As an initial example, notice that this specification is written in Diaryx Writing Format. ("Diaryx Writing Format" refers to the general format, and "Diaryx Writing Specification" refers to this specific document.)

## 0.3 Why is this standard needed?

1. **Digital writing has no single portable format.** Note-taking apps in particular are notorious for locking users into their ecosystem. Even when a popular format such as Markdown is used, there’s no agreement on how to represent important metadata such as dates, relation to other writings, or sharing permissions. As a result, personal writings — often a person’s most important and private records — risk being lost over time.
2. **Most things people write are not intended to be public.** In contrast, existing standardized writing formats are public-facing (essays, posts, microblogs, comments). HTML, APA, and MLA are all designed for public-facing or academic work. Non-public or private writing deserves the same long-term portability as published works.
3. **Recent technological advances are forcing the world to reconsider what makes writing meaningful.** Most famously, applications for interfacing with large language models, such as ChatGPT, have shocked many people into wondering if essays are a dying art. The Diaryx Writing Format brings focus back on the timeless, core meaning of writing: the connection between reader and author.

The Diaryx Writing Format aims to fill these gaps by **standardizing good, readable metadata practices.** This helps Diaryx files be super portable and shareable, helps writers keep in mind why they are writing, and helps readers make more informed decisions about what they read.

## 0.4 Principles

Principles are guidelines for how this specification should be. Here are some guidelines:
- **Human-readable**: Diaryx metadata should make intuitive sense to a non-technical person reading the plain text file. For example, we avoid JSON and prefer YAML. And by default, a file's format is CommonMark, a well-defined markup syntax designed to be both readable in plain text and publishable as-is.
- **Self-describing**:  A Diaryx file should describe itself sufficiently well to introduce a newcomer. For example, the required properties answer the basic newcomer questions of "What is this?" (title) "Who wrote it?" (author) "Who can see it?" (visibility). Additional optional properties allow authors to provide more context when needed.
- **Author flexibility**: Should limit the author as little as possible— not requiring them to name or organize their files in a specific way where reasonable.
- **Minimal metadata**: A Diaryx file should describe itself as concisely as possible. It should follow well-established conventions and use the absolute minimum amount of metadata possible, while still being sufficiently self-describing.

## 0.5 YAML Frontmatter

A Diaryx file is typically a markdown file with a `.md` extension. In this file, there is a special section called "frontmatter." It is started and ended by triple dashes (`---`). Within the triple dash area is structured data written according to [YAML format](https://yaml.org). YAML is a simple way to write structured data.

## 0.6 Character Encoding and Line Endings

The Diaryx Writing Format uses UTF-8 character encoding and prefers LF (`\n`) line endings.

# 1.0 Required Properties

In Diaryx, some properties are required and some are optional. This section discusses the required properties.

## 1.1 `title`

This is a short string representing the document. Can include special characters as long as you wrap it in quotes or backslash-escape them.

```yaml
title: This is a title
title: "This { is:a } [ title:with ] <special:characters>"
```

## 1.2 `author`

Single string or list of strings representing author/authors of document. 

```yaml
# single author
author: A Single Author

# multiple authors
author:
- Author 1
- Author 2
- Author 3

# also supported:
author:
- A single author
```

## 1.4 `audience`

Intended to represent who the writing is intended for. Usually a list of values, but can rarely be a single value. Each of the strings can be anything, but there are a few values reserved words with special functionalities.

### 1.4.1 `public`

```yaml
visibility:
- public
- friends
# …
```

**Function**
Used to indicate that the author doesn't mind allowing unrestricted access to anyone who happens to find the document.

**Explanation** 
It can be useful if the author wants to write something quickly to publish on the Internet. However, using `public` as the *only* value for `audience` is **strongly discouraged**. Applications implementing this specification should show a warning if that is the case. This is to encourage authors to consider their audience. Authors can use values such as `historians`, `[insert demographic group here]`, or whatever other value may clarify the reason why the document is public.

### 1.4.2 `universal`

```yaml
visibility: universal
```

**Function**
Same as `public`

**Explanation** 
Applies to documents of generally-agreed-upon moral or religious significance, such as the [Universal Declaration of Human Rights](https://www.un.org/en/about-us/universal-declaration-of-human-rights), the Bible, and other documents of truly far-reaching influence, usually ones that have been translated into many languages. Unlike `public`, it is permissible to use this as the *only* value for `audience`. Using this value means that the author truly intends the document to reach every single person ever. It is an opt-in measure so the author can say, "Yes, I truly intend to reach everyone. Don't make me specify more values because I have already truly considered my audience."

### 1.4.3 `private`

```yaml
visibility:
- private
- scratchpaper
# …
```

**Function**
Used to indicate that access is strictly limited to those named as author(s).

**Explanation**
It can be useful to make sure that the document is not accidentally published. However, using `private` as the *only* value for `audience` is **strongly discouraged**. Applications implementing this specification should show a warning if that is the case.  This is to encourage authors to consider the reason why the document is private. Authors may use values such as `externalization`, `catharsis`, `rant`, `scratchpaper`, or others to indicate the reason why the document is private.

### 1.4.4 `disposable`

```yaml
visibility:
- coworker1
- disposable
# …
```

**Function**
Used to indicate that the document is ephemeral and is intended to be deleted without negative consequences.

**Explanation**
Useful for very sensitive information, or for AA-style write-then-burn cathartic  writing. Obviously be very careful with this value.

# 2.0 Recommended Properties

These properties are not required, but are recommended for most use-cases. They may be required in some contexts.

## 2.1 `created`,  `updated`

RFC 3339 formatted timestamps representing the creation time and update time of the file.

### 2.1.1 A quick overview of the timestamp format

`YYYY-MM-DDTHH:mm:ss-ZZ:zz`
1. four digit year (0000-9999)
2. dash '-'
3. two digit month (01-12)
4. dash '-'
5. two digit day (01-31)
6. letter 'T'
7. two-digit 24-hour time (00-23)
8. colon ':'
9. two-digit minute (00-59)
10. colon ':'
11. two-digit second (00-59)
12. plus or minus sign ('+' or '-')
13. two-digit hour timezone difference from UTC
14. colon ':'
15. two-digit minute timezone difference from UTC

This is not a comprehensive review of the RFC-3339 timestamp spec, but rather a quick guide for reference.

## 2.2 `format`

Specifies the version of the Diaryx Writing Format used for the specific document.

```
format: [Diaryx v0.8.0](https://spec.diaryx.org)
```

## 2.3 `reachable`

The purpose of this property is to show where this document is accessible, so it can be easily shared.

For public documents, this can be a URL or PID— some kind of clickable link that takes you to the document. The purpose of this property is to give a reader a way to share the document without copying and sending the entire document. So it should either be a reliable reference, or if the document is not public, perhaps contact information for the author of the document.

```yaml
reachable: https://www.example.com
# or, perhaps for a non-public document…
reachable: johndoe@email.com
```

For private documents, this can be a file path, a cloud/backup service, or similar. Values like `none` are discouraged because of the possibility that even private writing may be shared in the future, or the possibility that an author might lose a note and recover it after a long time. It is nevertheless left to the author's discretion.

# 3.0 Optional Properties

## 3.1 `contents`

Specifies child documents that this file organizes.

```yaml
contents:
  - "[Chapter One](chapter-01.md)"
  - "[Chapter Two](chapter-02.md)"
```

**Format rules:**

- Files are represented as quoted Markdown links: `"[alias](link)"`
- Items should be listed in intended reading/processing order
- File paths are relative to the document containing this frontmatter
- Note that markdown links must be URL-encoded. To avoid this, the CommonMark spec allows links to be wrapped in angle brackets so you can write the name of the link without URL encoding (for example, `[GoCoEdit Files](<GoCoEdit Files.md>)` as opposed to `[GoCoEdit Files](GoCoEdit%20Files.md)`)
- Make sure to include file extensions in the link for compatibility.
- Each referenced file should include a `part_of` property that links to this document.

## 3.2 `part_of`

Specifies parent index files that contain/organize this document.

```yaml
# Single parent
part_of: "[](<GoCoEdit files.md>)"

# Multiple parents
part_of:
  - "[](<GoCoEdit files.md>)"
  - "[](<Creative Writing.md>)"
```

**Format rules:**

- Similar to format rules for `contents`
- Each referenced file should include a `contents` property that links to this document.

## 3.3 `version`

A version number for the document, in case you want to record formal version updates. This specification has an example at the top.

## 3.4 `copying`

Used for showing users the ways they are allowed to copy the document. Can be a file path to a license file, or a link to a popular license, such as <https://creativecommons.org/licenses/by/4.0/>. This specification has an example at the top.

## 3.5 `checksums`

File path to checksums. Useful for verifying file downloads.

## 3.6 `banner`

Used for specifying an optional Notion-style image banner over a file. Link to image, or alternatively use `!(alias)[<link>]` syntax.

## 3.7 `language`

Used for specifying the language this file is written in.

## 3.8 `tags`, `aliases`

Both of these are lists of arbitrary strings. `tags` is used for assigning topics or organization groups to entries. `aliases` is used to specify other names this entry could go by.

```yaml
tags: ["notes","thoughts"] #any string you want, as many as you want
aliases: ["That one note", "my favorite note"]
```

## 3.10 `starred`

Boolean flag indicating that this file has been designated by the author to be part of a special first-class group of documents.

## 3.11 `pinned`

Flag indicating that this file has been designated as requiring a prominent, visible spot in the UI.

# 4.0 Additional Optional Properties

For additional optional properties, see the following:
- Appendix A — Optional Properties — Health
- Appendix B — Optional Properties — Location
- Appendix C — Optional Properties — Weather
- Appendix D — Optional Properties — Device Information

# 5.0 Error Handling

If the YAML frontmatter is malformed, it may not be parsed and the Diaryx-formatted file is invalid.

If any of the required properties are missing pr invalid, the whole Diaryx file is invalid.

If the YAML is valid and required properties are present and valid, but some optional properties do not adhere to rules in the specification (for example, an invalid range or unit), that specific property is invalid, but the Diaryx formatted file is otherwise valid.

# 6.0 Contribution and Extensibility

The Diaryx Writing Specification is currently hosted on GitHub. To propose a change, please submit an issue or a pull request. Generally, it is recommended to submit an issue before submitting a pull request, so discussions can be made before proposing changes.

The Diaryx Writing Specification does not expressly prohibit additional YAML properties not in the specification, so it should be compatible with existing, more specific needs. If you have a workflow or use-case that you feel other authors would benefit from, please submit an issue or contact me at adam@diaryx.net.

***

# Appendix A — Optional Properties — Health

For those who use journaling to track their health, Diaryx has optional support for a wide array of health metrics: mood, activity, sleep, vitals, and nutrition. 

## A.1 `mood`

One-word description of feeling.

```yaml
mood: "content" # :-)
mood: "calm" # :)
mood: "numb" # :|
```

## A.2 `mood_scale`

Rating of feeling from one to ten.

```yaml
mood_scale: "8/10" #feeling pretty good!
mood_scale: "3/10" #feeling sad :(
mood_scale: "11/10" #invalid, too high
mood_scale: "1/5" #invalid, must be out of 10
```

## A.3 `activity_distance`

If an activity you are doing takes place over distance, you can record the distance here. Supported units include `mi`, `km`, `yd`, and `m`.
```yaml
activity_distance: "2mi" # nice run!
activity_distance: "1.2 km" #good job! (space between number and unit is optional)
activity_distance: "5 parsecs" #invalid unit
```

## A.4 `activity_type`

Record the type of activity you are doing here.
```yaml
activity_type: "running" # going fast!
activity_type: "HIIT" # working hard!
activity_type: "dance" # got moves?
```

## A.5 `calories_burned`

If you track the number of calories you burn during an activity, you can record it here.

```yaml
calories_burned: 1 #did you move today?
calories_burned: 1000 #wow, slow down
calories_burned: -5 #invalid, must be >0
```

## A.6 `steps`

If you track a number of steps you take, you can record that number here.

```yaml
steps: 100 #sedentary
steps: 20000 #many
steps: -100 #invalid, must be >0
```

## A.7 `sleep_hours`

Record the number of hours you sleep here. Single floating-point or integer number.
```yaml
sleep_hours: 8 # good sleep!
sleep_hours: 7.5 #realistic
sleep_hours: 1.45 #invalid, only one decimal allowed
sleep_hours: -3 #invalid, must be >0
```

## A.8 `sleep_scale`

Rate the quality of your sleep from 1 to 10. Same rules as `mood_scale`

## A.9 `blood_pressure`

Record systolic and diastolic blood pressure in the format similar to `120/80`
```yaml
blood_pressure: "140/100" #high
blood_pressure: "120.1/80.7" #invalid, only integers
blood_pressure: "120 / 80" # spaces are optional
blood_pressure: "120-80" #invalid, must be a /
```

## A.10 `heart_rate`

Record heart rate in beats per minute (bpm). Integer.
```yaml
heart_rate: 60 #resting rate
heart_rate: 400 #hummingbird
heart_rate: -80 #invalid, must be >0
```

## A.11 `body_weight`

Record your body weight. Floating point number or integer. Supports two units: `lbs` and `kg`
```yaml
body_weight: "130lbs" #average woman
body_weight: "185 lbs" # space optional
body_weight: "55kg" #artemis fowl
```

## A.12 `calories_consumed`

Record the number of calories consumed, for those who count their calories. Integer >0.
```yaml
calories_consumed: 2000 #recommended daily amount
```

## A.13 `carbs_consumed`

Count the gram amount of carbohydrates consumed. Integer >0.

## A.14 `fats_consumed`

Count the gram amount of fat consumed. Integer >0.

## A.15 `proteins_consumed`

Count the gram amount of protein consumed. Integer >0.

## A.16 `water_consumed`

Count the amount of water consumed. Supports four units: `glasses`, `cups`, `grams`, and `liters`.
```yaml
water_consumed: "8 glasses" #good job!
water_consumed: "1liter" #thirsty! Space optional, `liter` is valid when the number is 1
```


# Appendix B — Optional Properties — Location

For those who use journaling to log their travels, Diaryx has optional support for location data, including `coordinates`, `location`, and `position`. 

## B.1 `coordinates`

This property is a comma-separated pair of floating point decimals, representing geographic coordinates. Degree sign (º) and letter indicators (N/S, E/W) are optional. Assumes the global WGS 84 datum.

```yaml
coordinates: "43.72309° N, 10.39657° E" # Leaning tower of Pisa!
coordinates: "-33.85684, 151.21510" # Sydney opera house!
# North/east = positive, south/west = negative
```

## B.2 `location`

This property is a string of text representing an address. Due to the widely varying nature of mailing/residental addresses, there is no standardized format for this property. A good rule of thumb is that a person should be able to copy/paste this value into a digital map and be able to find the location you are referring to.

```yaml
location: "1 Infinite Loop, Cupertino, CA  95014, United States"
location: "Great Pyramid of Giza, Giza, Egypt"
location: "40 Sejong-daero, Jung-gu, Seoul 04528, South Korea"
```

## B.3 `position`

This property is meant to include more specific information about location, such as a room in a house, a position on a chair, or a floor in a building.

```yaml
position: "bedroom"
position: "sitting on chair"
position: "3rd floor"
```


# Appendix C — Optional Properties — Weather

For those who log the weather in their journal, Diaryx has optional support for weather metadata. For now, this is supported in only one property.

## C.1 `weather`

This property is an enumerated value from a list taken from Open Weather Map. The value in the `weather` property may be any of the following, or up to four separate values containing no more than one value from each section:

### C.1.1 Thunderstorms

```
thunderstorm with light rain
thunderstorm with rain
thunderstorm with heavy rain
light thunderstorm
thunderstorm
heavy thunderstorm
ragged thunderstorm
thunderstorm with light drizzle
thunderstorm with drizzle
thunderstorm with heavy drizzle
```

### C.1.2 Precipitation

```
light intensity drizzle
drizzle
heavy intensity drizzle
light intensity drizzle rain
drizzle rain
heavy intensity drizzle rain
shower rain and drizzle
heavy shower rain and drizzle
shower drizzle
light rain  
moderate rain  
heavy intensity rain  
very heavy rain  
extreme rain  
freezing rain  
light intensity shower rain
shower rain  
heavy intensity shower rain  
ragged shower rain
light snow  
snow  
heavy snow  
sleet  
light shower sleet  
shower sleet  
light rain and snow  
rain and snow  
light shower snow  
shower snow  
heavy shower snow
```

### C.1.3 Special

```
mist  
smoke  
haze  
sand/dust whirls  
fog  
sand  
dust  
volcanic ash  
squalls  
tornado
```

### C.1.4 Cloud cover

```
clear sky  
few clouds: 11-25%  
scattered clouds: 25-50%  
broken clouds: 51-84%  
overcast clouds: 85-100%
```

### C.1.5 Example

```yaml
weather: "thunderstorm" # it was a dark and stormy night…
weather: 
- "thunderstorm" # Or perhaps it was stormy…
- "snow" # AND snowy…
- "smoke" # And smokey?
- "scattered clouds: 25-50%" # And only half-covered?
```

**What about more weather information?**

Values such as sunset/sunrise times, moon phase, and length of day can be calculated from the location and time of your entry.

# Appendix D — Optional Properties — Device Information

For those who want to track which files were created on which device, Diaryx has optional support for device information properties. These properties have a soft-standardization: specific strings in them will be recognized, but there is no specific schema for them.

## D.1 `created_on_hardware`

This property is used to specify what kind of hardware this file was created on. For detailed information, you may use key-values separated by semicolons. You may also include a list of options to indicate that this entry was created through multiple devices.
```yaml
# general devices
created_on_hardware: "phone"
created_on_hardware: "laptop"
created_on_hardware: "desktop"
created_on_hardware: "tablet"
created_on_hardware: "e-reader"
created_on_hardware: "watch"
created_on_hardware: "other" # not recommended. Prefer leaving the property out entirely

# specific devices
created_on_hardware: "Adam's Laptop; Model Identifier: Mac15,6" # supported; "laptop" will be identified

created_on_hardware: # multiple entries supported
- "Adam's Laptop"
- "Adam's Phone"
- "Adam's Tablet"
```

## D.2 `created_on_software`

This property is used to specify which software this file was created with.

```yaml
created_on_software: "[Diaryx](https://www.diaryx.net)"
created_on_software: # mutliple entries supported
- "Diaryx"
- "Neovim"
- "Obsidian"
```