package de.unibielefeld.planung.model;

public class CourseModule {
    private String id;
    private String code;
    private String name;
    private int lp;
    private String semester;
    private String binding;
    private String sl;
    private String bPr;
    private String uPr;
    private String type; // e.g. "Schwerpunkt", "Basis", "Ergänzung"
    private String area; // e.g. "Pflicht", "Wahlpflicht", "MiKE", "Strukturierte Ergänzung"
    private String link;

    public CourseModule() {}

    public CourseModule(String id, String code, String name, int lp, String semester, 
                        String binding, String sl, String bPr, String uPr, String type, String area, String link) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.lp = lp;
        this.semester = semester;
        this.binding = binding;
        this.sl = sl;
        this.bPr = bPr;
        this.uPr = uPr;
        this.type = type;
        this.area = area;
        this.link = link;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getLp() { return lp; }
    public void setLp(int lp) { this.lp = lp; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getBinding() { return binding; }
    public void setBinding(String binding) { this.binding = binding; }

    public String getSl() { return sl; }
    public void setSl(String sl) { this.sl = sl; }

    public String getbPr() { return bPr; }
    public void setbPr(String bPr) { this.bPr = bPr; }

    public String getuPr() { return uPr; }
    public void setuPr(String uPr) { this.uPr = uPr; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}
