type ResponseTypes = {
  clearPreviewData: () => void
  writeHead: (arg0: number, arg1: { Location: string }) => void
  end: () => void
}

export default async function exit(_: void, res: ResponseTypes): Promise<void> {
  res.clearPreviewData()

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' })
  res.end()
}
