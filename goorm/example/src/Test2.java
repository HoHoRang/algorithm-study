import java.io.*;
import java.util.ArrayList;
import java.util.List;

class Test2 {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		String input = br.readLine();

		int length = Integer.parseInt(input.split(" ")[0]);
		int select = Integer.parseInt(input.split(" ")[1]);

		String strArr = br.readLine();
		String[] split = strArr.split(" ");

		List<Integer> numbers = new ArrayList<Integer>(length);

		for(int i = 0; i < length; i++) {
			numbers.add(Integer.parseInt(split[i]));
		}

		int find = 1;

		int firstIdx = numbers.indexOf(find);
		int lastIdx = numbers.lastIndexOf(find);
		int count = 0;

		while(firstIdx != 0 || lastIdx != length-1) {
			// 왼쪽으로 선택
			if(firstIdx != 0) {
				for(int i = 1; i < select; i++) {
					if(firstIdx-i < 0) {
						break;
					}
					numbers.set(firstIdx-i, find);
				}
				count++;
				firstIdx = numbers.indexOf(find);
			}
			
			// 오른쪽으로 선택
			if(lastIdx != length-1) {
				for(int i = 1; i < select; i++) {
					if(lastIdx+i > length-1) {
						break;
					}
					numbers.set(lastIdx+i, find);
				}
				count++;
				lastIdx = numbers.lastIndexOf(find);
			}
			System.out.println(numbers);
			System.out.println(count);
		}

		System.out.println(count);

		System.out.println(length + " " + select);

		br.close();
	}
}