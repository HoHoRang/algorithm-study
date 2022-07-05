/* Scanner */
// import java.util.*;
// public class Main{
// 	public static void main(String args[]){
// 		Scanner sc = new Scanner(System.in);

//     int length = Integer.parseInt(sc.nextLine());
//     String str = sc.nextLine();
//     String[] strArr = str.split(" ");
// 		int[] arr = new int[length];
// 		int count = 0;

// 		for(int i=0; i<length; i++) {
// 				arr[i] = Integer.parseInt(strArr[i]);
// 		}

// 		for (int i = 0; i < length; i++) {
// 			for (int j = 0; j < length - i; j++) {
// 				if (j + 1 < length && arr[j] > arr[j + 1]) {
// 					arr[j] = arr[j] + arr[j + 1];
// 					arr[j + 1] = arr[j] - arr[j + 1];
// 					arr[j] = arr[j] - arr[j + 1];
// 					count++;
// 				}
// 			}
// 		}

// 		System.out.println(count);

// 		sc.close();
// 	}
// }

/* BufferedReader */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
public class Main{
	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int length = Integer.parseInt(br.readLine());
		StringTokenizer st = new StringTokenizer(br.readLine());
		int[] arr = new int[length];
		int count = 0;

		for(int i=0; i<length; i++) {
			arr[i] = Integer.parseInt(st.nextToken());
		}

		for (int i = 0; i < length; i++) {
			for (int j = 0; j < length - i; j++) {
				if (j + 1 < length && arr[j] > arr[j + 1]) {
					arr[j] = arr[j] + arr[j + 1];
					arr[j + 1] = arr[j] - arr[j + 1];
					arr[j] = arr[j] - arr[j + 1];
					count++;
				}
			}
		}

		System.out.println(count);
	}
}