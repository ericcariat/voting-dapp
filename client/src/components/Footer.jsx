function Link({ uri, text }) {
  return <a href={uri} target="_blank" rel="noreferrer">{text}</a>;
}

function Footer() {
  return (
    <footer>
      <h2>Just for quick copy/paste </h2>

      <div className="owneraddr">
      Owner = 0xcD3610Ae8e3534D2B0663d0368fa737e959E98B7<br />

      Account 1 = 0x305E5dbCcFc1BC4a5aE3E67e64830ce55b51dCD6<br />

      Account 2 = 0xbb9506146792b0E70EC167c4439b0ABF1DC9B7f4<br />

      Account 3 = 0x5CD17a45CB93042E86db98c53C3A97adE5D37516<br />

      </div>
    </footer >
  );
}

export default Footer;
