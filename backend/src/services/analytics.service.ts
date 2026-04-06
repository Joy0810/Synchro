import { getOverviewStats, getGroupStats } from '../models/analytics.model';

export const fetchOverview = async () => {
  const stats = await getOverviewStats();
  return {
    total_groups: parseInt(stats.total_groups),
    total_assignments: parseInt(stats.total_assignments),
    submitted_count: parseInt(stats.submitted_count),
    pending_count: parseInt(stats.pending_count),
  };
};

export const fetchGroupStats = async () => {
  const rows = await getGroupStats();
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    submitted_count: parseInt(r.submitted_count),
    total_assignments: parseInt(r.total_assignments),
    pending_count: parseInt(r.total_assignments) - parseInt(r.submitted_count),
  }));
};