exports.up = (pgm) => {
  pgm.createTable("company_info", {
    id: "id",
    companyName: { type: "varchar(255)", notNull: true },
    roC: { type: "varchar(100)", notNull: true },
    companyStatus: { type: "varchar(50)", notNull: true },
    companyActivity: { type: "varchar(50)", notNull: true },
    cin: { type: "varchar(21)", notNull: true, unique: true },
    registrationDate: { type: "date", notNull: true },
    category: { type: "varchar(100)", notNull: true },
    subCategory: { type: "varchar(100)", notNull: true },
    companyClass: { type: "varchar(50)", notNull: true },
    authorisedCapital: { type: "int", notNull: true },
    paidUpCapital: { type: "int", notNull: true },
    state: { type: "varchar(100)", notNull: true },
    pinCode: { type: "varchar(6)", notNull: true },
    country: { type: "varchar(50)", notNull: true },
    address: { type: "text", notNull: true },
    email: { type: "varchar(255)", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("company_info");
};
