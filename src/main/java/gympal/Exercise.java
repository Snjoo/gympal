package gympal;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable(tableName = "exercise")
public class Exercise {
	
	@DatabaseField(generatedId = true)
	private int id;
	
	@DatabaseField
	private String name;
	
	@DatabaseField
	private String additionalInfo;

	@DatabaseField
	private int repetitions;
	
	@DatabaseField(canBeNull = false, foreign = true, foreignAutoRefresh = true)
    private Routine routine;
	
	public Exercise() {
		// Constructor for ormlite
	}
	
	public int getId() {
		return this.id;
	}
	
	public String getName() {
		return this.name;
	}
	
	public String getAdditionalInfo() {
		return this.additionalInfo;
	}
	
	public int getRepetitions() {
		return this.repetitions;
	}
	
	public Routine getRoutine() {
		return routine;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setAdditionalInfo(String additionalInfo) {
		this.additionalInfo = additionalInfo;
	}
	
	public void setRepetitions(int repetitions) {
		this.repetitions = repetitions;
	}
	
	public void setRoutine(Routine routine) {
		this.routine = routine;
	}
}
