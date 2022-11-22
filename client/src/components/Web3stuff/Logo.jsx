import useEth from "../../contexts/EthContext/useEth";

function Logo() {
  const { state: { accounts } } = useEth();
  
  return (
    <div class="st">

      <div class="st-top">
        <div class="st-bound st-bound-full"></div>
        <p><span class="st-drop st-stranger-s">S</span><span class="st-stranger-t">t</span><span class="st-stranger-r">r</span><span class="st-stranger-a">a</span><span class="st-stranger-n">n</span><span class="st-stranger-g">g</span><span class="st-stranger-e">e</span><span class="st-drop st-stranger-r-2">r</span>
        </p>
        <div class="st-bound st-bound-mini st-bound-left"></div>
        <div class="st-bound st-bound-mini st-bound-right"></div>
      </div>

      <div class="st-bottom">
          <p><span class="st-things-t">V</span><span class="st-things-h">o</span><span class="st-things-i">t</span><span class="st-things-n">i</span><span class="st-things-g">n</span><span class="st-things-s">G</span></p>
      </div>

    </div>
    );
}

export default Logo;