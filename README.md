#Monator Liferay Instant Deploy Theme Tool

This small Gulp script will monitor your source code theme folder and 
when a file is changed:

1. Instantly inject those changes into the server.

       This is done by by copying the changed files to the Liferay server (tomcat/webapps/your-theme).
 
       Out of the box, Liferay listens to changes in the webapps folder and the changes will be visible as soon as you reload your browser.
 
2. Makes sure that the scss is recompiled into a css file if needed.

       If you edit a scss file, the scss needs to be preprocessed and a css file needs to be created. Liferay will do this as well. However which scss file that file is imported in (and therefor which scss if you edit a scss partial, Liferay is not smart enough to understand file needs to be preprocessed.
 
       When a scss partial file is changed, this script will add a timestamp comment in the entry point scss file (the scss file which imports the changed file)
 
       As the entry point scss file is changed, Liferay will pick up on this and re-preprocess the file and create a css file.
 

###Installation
1. Make sure you have [Node.js](http://nodejs.org/) installed. Run `node -v` to get current installed version if unsure.
2. cd to _monator-liferay-instant-deploy-theme-tool_ directory
3. run `npm install` to download all dependenciese.
4. Open Gulpfile.js in your favourite text editor and edit the paths (see below).
4. run `Gulp` to start watching for files. Leave that terminal running as long as you want the app to be active.

###Settings
Open Gulpfile.js for editing. 

First, you need to configure 2 folders to watch for changes:

* `themeSource` - your theme root folder, most likely what you have version controlled.
* `partialsSource` - the path to your [scss partials](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).

In both cases you want to define a Glob using the [minimatch syntax](https://github.com/isaacs/minimatch).

Common used syntax:

	*  - matches any characters but slash (/).
	** - matches any characters including slash (/). Meaning, recursively include subfolder(s), if any.

Example: Matching all files in webapp its subdirectories.

	themeSource: '/code/my-project/my-theme/src/main/webapp/**'

Example: Matching all files begining with an underscore (_) and ending with .scss, in a subdirectory to partials.

	partialsSource: '/code/my-project/my-theme/src/main/webapp/css/partials/**/_*.scss'

Then you need to configure:

* `themeServer` - the theme root folder on the server (tomcat/webapps/your-theme).
* `entryPointSource` - the path to your entry point css file (the css file which imports your scss partials).
* `entryPointFolderServer` - the folder path on the server where theentryPointSource is placed (on the server). 