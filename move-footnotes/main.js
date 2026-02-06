var obsidian = require('obsidian');

class FootnoteMoverPlugin extends obsidian.Plugin {
	async onload() {
		console.log("Footnote mover loaded");
		this.target = null;
		
		this.move = function() {
			this.target = null;
			var sections = this.app.workspace.activeLeaf.view.previewMode.renderer.sections;
			for (var i = 0; i < sections.length; i++){
				if (sections[i].html.includes("<footnotes/>") && this.target == null){
					this.target = sections[i].el;
				}
				if (sections[i].el.classList.contains("el-section")){
					var footnotes = sections[i].el.querySelector(".footnotes");
					if(footnotes != null){
						if(this.target != null){
							this.target.insertAfter(footnotes);
						}
					}
				}
			}
		}
		
		//this.registerEvent(this.app.workspace.on("editor-change", () => {this.move();}));
		this.registerEvent(this.app.workspace.on("layout-change", () => {this.move();}));
		this.move();
	}
}

module.exports = FootnoteMoverPlugin;