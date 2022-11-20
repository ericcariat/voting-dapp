function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h2>Just for quick copy/paste </h2>

      <div className="owneraddr">
      Owner = 0x305E5dbCcFc1BC4a5aE3E67e64830ce55b51dCD6<br />

      Voter 1 = 0xbb9506146792b0E70EC167c4439b0ABF1DC9B7f4<br />

      Voter 2 = 0x5CD17a45CB93042E86db98c53C3A97adE5D37516<br />

      Voter 3 = 0x79395908B13A62314d946607eA3A3471dAb9f885<br />

      Unknown = 0x0D2E85Ab978Deeb6a46215a8332a7bf5Ce91A695<br />
      </div>
    </footer >
  );
}

export default Footer;
