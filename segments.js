String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) { 
		return typeof args[number] != 'undefined'
			? args[number]
			: match
		;
	});
};




class text_plain{
	constructor(){
		this.text = ""
		this.base_html = "<p>plain text</p>\
				<textarea id=\"text\" class=\"input\" style=\"width:300px;\">{0}</textarea>"
	}
	get_html(){
		return this.base_html.format(this.text)
	}
	get_preview(){
		return this.text
	}
	get_result(){
		return this.text
	}
}



class text_colored{
	constructor(){
		this.text = ""
		this.color = "#000000"
		this.base_html = "<p>colored text</p>\
				<textarea id=\"text\" class=\"input\" style=\"width:300px;\">{0}</textarea>\
				<input type=\"color\" id=\"color\" class=\"input\" value=\"{1}\"></input>"
		this.preview_html = "<span style=\"color:{1};\">{0}</span>"
	}
	get_html(){
		return this.base_html.format(this.text, this.color)
	}
	get_preview(){
		return this.preview_html.format(this.text, this.color)
	}
	get_result(){
		return "[c/{0}:{1}]".format(this.color.slice(1), this.text)
	}
}



class text_rainbow{
	constructor(){
		this.text = ""
		this.color = "#000000"
		this.offset = 0
		this.base_html = "<p>colored text</p>\
				<textarea id=\"text\" class=\"input\" style=\"width:300px;\">{0}</textarea>\
				<input type=\"color\" id=\"color\" class=\"input\" value=\"{1}\"></input>\
				<input type=\"number\" id=\"offset\" class=\"input\" value=\"{2}\"></input>"
		this.preview_html = "<span style=\"color:{1};\">{0}</span>"
	}
	get_html(){
		return this.base_html.format(this.text, this.color, this.offset)
	}
	get_preview(){
		let preview = ""
		let color_hsl = hexToHSL(this.color)
		for (var i = 0; i < this.text.length; i++) {
			let letter = this.text[i]
			preview += this.preview_html.format(letter, HSLToHex(color_hsl))
			color_hsl[0] += parseInt(this.offset)
			if (color_hsl[0] >= 360){
				color_hsl[0] -= 360
			}
			if (color_hsl[0] <= 0){
				color_hsl[0] += 360
			}
		}
		return preview
	}
	get_result(){
		let result = ""
		let color_hsl = hexToHSL(this.color)
		for (var i = 0; i < this.text.length; i++) {
			let letter = this.text[i]
			result += "[c/{0}:{1}]".format(HSLToHex(color_hsl).slice(1), letter)
			color_hsl[0] += parseInt(this.offset)
			if (color_hsl[0] >= 360){
				color_hsl[0] = 0
			}
		}
		return result
		return "[c/{0}:{1}]".format(this.color.slice(1), this.text)
	}
}