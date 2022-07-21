import java.io.*;

class Test3 {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());

    for(int i = 0; i < N; i++) {
      String input = br.readLine();

      long limited = Long.parseLong(input.split(" ")[0]);
      long normal = Long.parseLong(input.split(" ")[1]);

      int count = 0;

      count = (int)Math.min(limited/5, (limited+normal)/12);
			
			if(count != 0 && limited%(count*5) >= 5 && limited%(count*5) + normal%(count*7) >= 7) {
        count++;
      }

      System.out.println(count);

    }

		br.close();
	}
}