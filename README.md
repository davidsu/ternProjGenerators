# ternProjGenerators

--------------------------------------------------------------------------------
project specific generators for .tern-proj file

generates .tern-proj files for various projects in which I work with.
for each project there should be a file executable with the same name as the project.

##Usage

--------------------------------------------------------------------------------
you need to pipe the output to the relevant file.
```sh
    ./santa.js > ~/projects/santa/.tern-project
```

###Note

--------------------------------------------------------------------------------
some of the generated files might be excessively verbose with some useless data.

*BUT* as long as tern know how to jump to declaration and rename my variables I'm
happy enough with it.

If you got here I encourage you a lot to help me making these generators cleverer.
