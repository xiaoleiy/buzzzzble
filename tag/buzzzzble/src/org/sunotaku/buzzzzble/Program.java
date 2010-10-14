package org.sunotaku.buzzzzble;

public class Program {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String chinese = "{\"content\" : 中华人民共和国}";
		for (char c : chinese.toCharArray()) {
			System.out.print(Integer.toHexString(c) + " ");
		}
		System.out.print("\n");
		String str = "\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd";
		for (char c : str.toCharArray())
			System.out.println(c);

	}

}
