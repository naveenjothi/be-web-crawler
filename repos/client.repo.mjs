import pool from "../db.mjs";

export const insertOne = async (data) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const insertQuery = `
      INSERT INTO company_info (
        companyName, roC, companyStatus, companyActivity, cin, registrationDate, category, subCategory, companyClass, authorisedCapital, paidUpCapital, state, pinCode, country, address, email
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      ) RETURNING id;
    `;

    const values = [
      data.companyName,
      data.roC,
      data.companyStatus,
      data.companyActivity,
      data.cin,
      data.registrationDate,
      data.category,
      data.subCategory,
      data.companyClass,
      data.authorisedCapital,
      data.paidUpCapital,
      data.state,
      data.pinCode,
      data.country,
      data.address,
      data.email,
    ];

    await client.query(insertQuery, values);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting data:", error);
  } finally {
    client.release();
  }
};
