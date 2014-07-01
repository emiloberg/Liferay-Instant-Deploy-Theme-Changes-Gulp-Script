#Monator Liferay Instant Deploy Theme Tool

This small Gulp script will monitor your source code theme folder and 
when a file is changed:

1. **Instantly inject those theme changes into the server.**

       This is done by by copying the changed files to the Liferay server (tomcat/webapps/your-theme).
 
       Out of the box, Liferay listens to changes in the webapps folder and the changes will be visible as soon as you reload your browser. However, if you edit the (s)css, you don't even need to reload the browser - see third point below.
 
2. **Makes sure that the scss is recompiled into a css file if needed.**

       If you edit a scss file, the scss needs to be preprocessed and a css file needs to be created. Liferay will do this as well. However which scss file that file is imported in (and therefor which scss if you edit a scss partial, Liferay is not smart enough to understand file needs to be preprocessed.
 
       When a scss partial file is changed, this script will add a timestamp comment in the entry point scss file (the scss file which imports the changed file)
 
       As the entry point scss file is changed, Liferay will pick up on this and re-preprocess the file and create a css file.
       
3. **LiveReload.** If the scss is changed, the browser is updated instantly - without need to reloading the page. 

	For LiveReload to work, you need to install a small [browser plugin for Chrome, Firefox or Safari](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) or [add a javascript snippet to your html](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually). Browser plugin is prefered as you don't have to remove it before going live.

###Installation
1. Make sure you have [Node.js](http://nodejs.org/) installed. Run `node -v` to get current installed version if unsure.
2. Make sure you have [Gulp](gulpjs.com) installed. Run `gulp-v` to get current installed version if unsure. If not install, run `npm install -g gulp` to install.
3. cd to _monator-liferay-instant-deploy-theme-tool_ directory
4. run `npm install` to download all dependenciese.
5. Open Gulpfile.js in your favourite text editor and edit the paths (see below).
6. run `Gulp` to start watching for files. Leave that terminal running as long as you want the app to be active.

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