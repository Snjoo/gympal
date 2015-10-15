package gympal;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

@DatabaseTable
public class Exercise {
	
	@DatabaseField
	private int id;
	
	@DatabaseField
	private String name;
	
	@DatabaseField
	private String additionalInfo;
	
	@DatabaseField
	private int repetitions;
}
