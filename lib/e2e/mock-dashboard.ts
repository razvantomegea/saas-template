export function isE2eMockDashboard(): boolean {
  return process.env.E2E_MOCK_DASHBOARD === "true";
}
