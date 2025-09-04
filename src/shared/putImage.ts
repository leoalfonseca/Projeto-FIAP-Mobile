export async function putImage(url: string, data: File): Promise<void> {
  const response = await fetch(url, {
    method: 'PUT',
    body: data,
    headers: {
      'Content-Type': data.type || 'application/octet-stream'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  console.log(JSON.stringify(responseData));
}
