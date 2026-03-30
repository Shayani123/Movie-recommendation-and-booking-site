import pool from "../config/db";

export const createTheater = async(data:any) => {
    const {name, city, address, totle_screens, created_at} = data;
    const result = await pool.query(
        "INSERT INTO theaters(name , city, address, totle_screens, created_at) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [name, city, address, totle_screens, created_at] 
    );
    return result.rows[0];
};

export const getTheaters = async() => {
    const result = await pool.query("SELECT * FROM theaters ORDER BY created_at DESC");
    return result.rows;
};

export const getTheaterById = async(theaterid: number) => {
    const result = await pool.query("SELECT * FROM theaters WHERE theaterid=$1",[theaterid]);
    return result.rows[0];
};

export const updateTheaterById = async(id: string, data: any) => {
    const {name , city, address, totle_screens, created_at} = data;
    const result = await pool.query("UPDATE theaters SET name=$1, city=$2, address=$3, totle_screens=$4, created_at=$5 WHERE id=$6 RETURNING *" ,
        [name, city, address, totle_screens, created_at]
    );
    return result.rows[0];
};

export const deleteTheaterById = async(id: number , data: any) => {
    const result = await pool.query("DELETE FROM theaters WHERE id=$1" , [id]);
    return result.rows[0];
};
