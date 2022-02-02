## IN DEVELOPMENT

To create a proper .compactignore file theres a few things to keep in mind.

* The whole file is an object, containing different Profile Declarations, with an array of entries inside.

If we were to just use the Profile Declaration of `global` with a single entry that would look like so

````(json)
{
  "global": [
    {
      "location": "",
      "comment": "",
      "action": ""
    }
  ]
}
````

Where `global` is the Profile Declaration, and the first object inside the array is a single entry.

Each entry then directs the profile how to create those parts of the file.

Where `comment` should insert a comment following the syntax of the file to be created by the Profile, this should be entered as completely plain text, and any syntax needed should be made by the Profile.

`location` will be the location of the file we want to preform the `action` on, this file shouldn't need any syntax for the Profile's language on weather or not to include or exclude it, as that is specified by the action, but will need to point to the file, however the language needs.

`action` will be what to do with the `location`. Valid values being to "exclude" or "include".

While an entry may just contain a comment, to only make a comment in the resulting file, if a `location` is specified it HAS to have an action associated. 
