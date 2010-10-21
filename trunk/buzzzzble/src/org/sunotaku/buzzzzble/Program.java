package org.sunotaku.buzzzzble;

import net.sf.json.JSONObject;

public class Program {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String str = "{data:{object:{type:'note', content:'总会耐高温'}}}";
		JSONObject json =JSONObject.fromObject(str);
		System.out.print(json.toString());
	}

}
