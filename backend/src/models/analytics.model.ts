import pool from '../config/db';

export const getOverviewStats = async () => {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM groups)      AS total_groups,
      (SELECT COUNT(*) FROM assignments) AS total_assignments,
      (SELECT COUNT(*) FROM submissions) AS submitted_count,
      (
        SELECT COUNT(*)
        FROM assignments a
        CROSS JOIN groups g
        WHERE NOT EXISTS (
          SELECT 1 FROM submissions s
          WHERE s.assignment_id = a.id AND s.group_id = g.id
        )
      ) AS pending_count
  `);
  return rows[0];
};

export const getGroupStats = async () => {
  const { rows } = await pool.query(`
    SELECT
      g.id,
      g.name,
      COUNT(s.id) AS submitted_count,
      (SELECT COUNT(*) FROM assignments) AS total_assignments
    FROM groups g
    LEFT JOIN submissions s ON s.group_id = g.id
    GROUP BY g.id, g.name
    ORDER BY g.name ASC
  `);
  return rows;
};