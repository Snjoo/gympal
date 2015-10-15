package gympal;

import com.google.gson.Gson;
import spark.ResponseTransformer;

public class JsonTransformerUtil {

	public static String toJson(Object object) {
		return new Gson().toJson(object);
	}

	public static ResponseTransformer json() {
		return JsonTransformerUtil::toJson;
	}
}
