/**
 * Serialises a structured-data object into a `<script type="application/ld+json">`.
 *
 * `<` is escaped as `<` so a value containing `</script` cannot close the
 * tag early — the standard injection guard for inline JSON-LD.
 */
const JsonLd: React.FC<{ data: object }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
)

export default JsonLd
