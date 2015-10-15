package gympal;
import static spark.Spark.*;

public class GymService {
	
	public static final int PORT = 7878;
	
	public static void main(String[] args) {
        port(PORT);
        
        get("/addroutine", (req, res) -> "Hello World");
    }
}
