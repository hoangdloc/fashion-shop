export async function fakeDelay (wait: number): Promise<unknown> {
  return await new Promise(resolve => setTimeout(resolve, wait * 1000));
}
