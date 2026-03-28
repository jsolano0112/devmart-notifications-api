export async function generateUniqueTrackingNumber(
  ShipmentModel: any,
): Promise<string> {
  const pad = (n: number, len = 2) => n.toString().padStart(len, '0');

  const genOnce = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1, 2);
    const dd = pad(d.getDate(), 2);
    const date = `${yyyy}${mm}${dd}`;
    const rand = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, '0');
    return `TRK-${date}-${rand}`;
  };

  for (let i = 0; i < 10; i++) {
    const candidate = genOnce();
    // check existence
    const exists = await ShipmentModel.findOne({ trackingNumber: candidate })
      .lean()
      .exec();
    if (!exists) return candidate;
  }

  throw new Error(
    'Unable to generate unique tracking number after maximum retries',
  );
}
