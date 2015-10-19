package gympal;

import static spark.Spark.*;

import java.util.List;

public class GymController {
	public static final int PORT = 7878;
	
	public GymController(final GymService gymService) {
        port(PORT);
        staticFileLocation("/webapp");
        
        get("/", (rew, res) -> {
        	res.redirect("/main.html");
        	return null;
        });
        
        get("/initdb", (rew, res) -> {
        	gymService.initDb();
        	res.redirect("/main.html");
        	return null;
        });
        
        get("/routines", (req, res) -> {
        	List<Routine> routines = gymService.getAllRoutines();
        	return routines;
        }, JsonTransformerUtil.json());
        
        get("/routines/:id", (req, res) -> {
        	String id = req.params(":id");
        	Routine routine = gymService.getRoutine(id);
        	if (routine != null) {
        		return routine;
        	}
        	res.status(400);
        	return new ResErr("No routine found with id " + id);
        }, JsonTransformerUtil.json());
        
        post("/routines", (req, res) -> gymService.createRoutine(req, res), JsonTransformerUtil.json());
    }
}
