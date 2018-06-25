<div class="stream-line">
    <div class="layout-container">
        <div class="row">
            <div class="col-md-12 text-container text-center">
                <p  id="copy">
                    30 years of retirement costs a lot. What’s your plan for the future?
                </p>
            </div>
        </div>
    </div>
</div>

<script>
    var list = [
        "30 years of retirement costs a lot. What’s your plan for the future?",
        "Me Pou iakoe tetai torungauru mataiti I muri ake I te akangaroi anga mai mei te angaanga moni e moni maata te ka anoano'ia. Eaa taau I akanoonoo no te reira tuatau?",
        "Tolusagavulu na yabaki ni vakacegu mai na cakacaka, ena gadreva edua na ilavo vinaka me sa vakabulai se maroroi tu. Na cava na nomu inavunavu me baleta nomu siga nimataka?",
        "Loga e fakalavelave mo e tau uka e tolugofulu tau he moui okioki mai he gahua. Ko e heigoa kia e haau a tau fakatokatokaaga ma e anoiha?",
        "E le taugofie lou taimi Litaea. O le a lau fuafuaga mo le lumana'i?",
        "Ko e totongi ha penisoni he ta’u ‘e 30 ‘oku lahi ‘aupito. Ko e ha leva ho’o palani ki he kaha’u?"
    ];
    var i = 0;
    setInterval(function () {
        document.getElementById('copy').innerHTML = list[i];
        if (i < list.length - 1) {
            i++;
        }
        else {
            i = 0;
        }
    }, 5000);
</script>
