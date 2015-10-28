package gympal;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.google.gson.Gson;

import spark.Spark;
import spark.utils.IOUtils;

public class GymControllerTest {
	
	// Tests API provided by Spark. Needs db connections to pass.
	
	@BeforeClass
	public static void setup() throws SQLException {

		Main.main(null);
	
		Spark.awaitInitialization();
	}
	
	@AfterClass
	public static void afterClass() {
		Spark.stop();
	}

	@Test
	public void testGetRoutines() throws IOException {
		UrlResponse res = request("GET", "/routines");
		Map<String, String> json = res.json();
		assertEquals(200, res.status);
		assertNotNull(json.get("routines"));
	}
	
	@Test
	public void testGetRoutine() throws IOException {
		UrlResponse res = request("GET", "/routines/1");
		Map<String, String> json = res.json();
		assertEquals(200, res.status);
		assertNotNull(json.get("duration"));
		assertNotNull(json.get("name"));
		assertNotNull(json.get("id"));
		assertEquals(1d, json.get("id"));
		assertNotNull(json.get("duration"));
	}

	private UrlResponse request(String method, String path) throws IOException {
		URL url = new URL("http://localhost:7878" + path);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod(method);
		connection.setDoOutput(true);
		connection.connect();
		String body = IOUtils.toString(connection.getInputStream());
		return new UrlResponse(connection.getResponseCode(), body);
	}
	
	private static class UrlResponse {

		public final String body;
		public final int status;

		public UrlResponse(int status, String body) {
			this.status = status;
			this.body = body;
		}

		@SuppressWarnings("unchecked")
		public Map<String,String> json() {
			return new Gson().fromJson(body, HashMap.class);
		}
	}

}
