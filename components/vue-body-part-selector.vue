<template>
  <div>
    <svg
      @click="part_clicked"
      :class="{'noClick': disabled}"
      cache-id="bb8da86584ca4169afb6d96b6a4360d2"
      id="e1Ud9J8S2xo1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 68.587668 92.604164"
      shape-rendering="geometricPrecision"
      text-rendering="geometricPrecision">
      <path
        v-if="showPartsMerged['cabeza']"
        @click="$emit('click','cabeza')"
        :style="getStyle('cabeza')"
        id="cabeza"
        v-b-tooltip.hover title="Cabeza"
        d="M11.671635,6.358545l-.0482-2.59085l4.20648-2.46806l4.42769,2.95361-.0405,1.94408.24197-3.34467-2.03129-2.31103-2.84508-.51629-2.20423.52915-1.9363,2.63077Z"/>
      <path
        v-if="showPartsMerged['rostro']"
        @click="$emit('click','rostro')"
        :style="getStyle('rostro')"
        id="rostro"
        v-b-tooltip.hover title="Rostro"
        d="M19.748825,6.703495l.0203-2.20747-3.96689-2.7637-3.74099,2.23559-.006,2.63528-.60741.0403.27408,1.82447.97635.33932.44244,2.18029l1.82222,2.06556l2.03518-.0607l1.79223-1.94408.35957-2.24066.97616-.33932.25159-1.78416Z"/>
      <path
        v-if="showPartsMerged['cuello']"
        @click="$emit('click','cuello')"
        :style="getStyle('cuello')"
        id="cuello"
        v-b-tooltip.hover title="Cuello"
        d="M13.304665,11.910505l1.64975,2.35202.74426,2.62159-1.73486-1.38354-.86649-2.97104Zm5.08047,0l-1.64975,2.35202-.74538,2.62234l1.73486-1.38354.86649-2.97104Z"/>
      <path
        v-if="showPartsMerged['hombro-izquierdo']"
        @click="$emit('click','hombro-izquierdo')"
        :style="getStyle('hombro-izquierdo')"
        id="hombro-izquierdo"
        v-b-tooltip.hover title="Hombro Izquierdo"
        d="M19.047795,13.248365l3.55748,1.97916.72653-.35074Zm-.107.43288l-.37119,1.73073l2.1846.53561l1.40116-.49436Zm3.98151,1.97595l.75814-.41l2.40806,1.66799l1.17364,1.50707.62662,1.5626-.0464,3.70194-1.3284-1.72153.0407-2.59376-.48842-.50049c0,0-3.09778-3.19058-3.14371-3.21401Zm-.2409.10873c-.001.0525,3.32987,3.54733,3.32987,3.54733l.10067,3.10396-1.15426-1.97782-2.22547-.94804-1.56576-2.88481Z"/>
      <path
        v-if="showPartsMerged['hombro-derecho']"
        @click="$emit('click','hombro-derecho')"
        :style="getStyle('hombro-derecho')"
        id="hombro-derecho"
        v-b-tooltip.hover title="Hombro Derecho"
        d="M12.624785,13.248365l-3.55746,1.97916-.72653-.35074Zm.107.43288l.37119,1.73073-2.18459.53561-1.40115-.49436Zm-3.98149,1.97595l-.75814-.41-2.40806,1.66799-1.17364,1.50707-.62662,1.56259.0464,3.70195l1.3284-1.72153-.0407-2.59376.48843-.5005c0,0,3.09777-3.19057,3.1437-3.214Zm.2409.10873c.002.0525-3.32987,3.54733-3.32987,3.54733l-.10067,3.10396l1.15426-1.97782l2.22547-.94804l1.56575-2.88481Z"/>
      <path
        v-if="showPartsMerged['brazo-izquierdo']"
        @click="$emit('click','brazo-izquierdo')"
        :style="getStyle('brazo-izquierdo')"
        id="brazo-izquierdo"
        v-b-tooltip.hover title="Brazo Izquierdo"
        d="M27.621665,30.814715l-.33838,1.70499-1.81932-2.54418-.6629-1.26895Zm-2.85271-2.6096c-.0259-.0144-.0536-.0254-.0824-.0324l-1.48333-4.95503l1.00456-2.08428l1.65511,1.74532l2.23034,6.67667.0415.93739c-1.06528-.84215-2.18962-1.60679-3.36434-2.28803Zm1.6945-5.75654l1.64893,6.43421-.36469-4.92266Z"/>
      <path
        v-if="showPartsMerged['antebrazo-izquierdo']"
        @click="$emit('click','antebrazo-izquierdo')"
        :style="getStyle('antebrazo-izquierdo')"
        id="antebrazo-izquierdo"
        v-b-tooltip.hover title="Antebrazo Izquierdo"
        d="M26.955425,32.969125l1.30083,10.28927-1.10778.01-1.89387-7.99609.19174-4.53719Zm1.21978-1.94971l-.58729,2.58635l1.11876,9.15614.55849-.21663.2304-6.77018Z"/>
      <path
        v-if="showPartsMerged['brazo-derecho']"
        @click="$emit('click','brazo-derecho')"
        :style="getStyle('brazo-derecho')"
        id="brazo-derecho"
        v-b-tooltip.hover title="Brazo Derecho"
        d="M4.074645,30.814715l.33838,1.70499l1.81931-2.54418.66289-1.26895Zm2.8527-2.6096c.0259-.0144.0536-.0254.0824-.0324l1.48332-4.95503-1.00455-2.08428-1.65509,1.74532-2.23034,6.67667-.0415.93739c1.06528-.84215,2.18961-1.60679,3.36433-2.28803Zm-1.6945-5.75654l-1.64891,6.43421.36468-4.92266Z"/>
      <path
        v-if="showPartsMerged['antebrazo-derecho']"
        @click="$emit('click','antebrazo-derecho')"
        :style="getStyle('antebrazo-derecho')"
        id="antebrazo-derecho"
        v-b-tooltip.hover title="Antebrazo Derecho"
        d="M4.575265,32.969125l-1.30083,10.28927l1.10778.01l1.89387-7.99609-.19174-4.53719Zm-1.21978-1.94971l.58728,2.58635-1.11875,9.15614-.55849-.21663-.2304-6.77018Z"/>
      <path
        v-if="showPartsMerged['pecho-izquierdo']"
        @click="$emit('click','pecho-izquierdo')"
        :style="getStyle('pecho-izquierdo')"
        id="pecho-izquierdo"
        v-b-tooltip.hover title="Pecho Izquierdo"
        d="M20.337455,17.085495l1.72942,3.09103l1.89346.94785-1.15295.90662-.90604,2.63773-2.09968.86537-3.34524-1.655.83425-6.50527Z"/>
      <path
        v-if="showPartsMerged['pecho-derecho']"
        @click="$emit('click','pecho-derecho')"
        :style="getStyle('pecho-derecho')"
        id="pecho-derecho"
        v-b-tooltip.hover title="Pecho Derecho"
        d="M11.351215,17.085495l-1.72942,3.09103-1.89346.94785l1.15295.90662.90586,2.63773l2.09967.86537l3.34636-1.655-.83462-6.50527Z"/>
      <path
        v-if="showPartsMerged['vientre-izquierdo']"
        @click="$emit('click','vientre-izquierdo')"
        :style="getStyle('vientre-izquierdo')"
        id="vientre-izquierdo"
        v-b-tooltip.hover title="Vientre Izquierdo"
        d="M19.641935,34.707615l1.81341-1.36479.15748,1.83347l1.28642,2.37338-1.98044,2.73652-1.03109.16554-.37026-3.88816Z"/>
      <path
        v-if="showPartsMerged['costillas-izquierdas']"
        @click="$emit('click','costillas-izquierdas')"
        :style="getStyle('costillas-izquierdas')"
        id="costillas-izquierdas"
        v-b-tooltip.hover title="Costillas Izquierdas"
        d="M19.288925,26.151995l-3.11202-1.40604.0937,2.27965l2.80119,1.43603Zm1.93471,1.66849l-1.29355.7212.14997-1.70898Zm-1.05303-1.63718l2.47968-1.03241-.9336,2.52093Zm1.53164,1.73729l-1.69005,1.03372-.28871,2.0678l1.64975-1.07533Zm-2.91143,1.10421l-.0622,1.62387-2.30308-.49961-.12448-2.21722Zm-.1556,2.4045l.0311,1.99844-2.20953.59391-.0311-3.1227Zm2.65459-.98535l-1.48383,1.03372-.20622,2.10905l1.64862-1.32355Z"/>
      <path
        v-if="showPartsMerged['vientre-derecho']"
        @click="$emit('click','vientre-derecho')"
        :style="getStyle('vientre-derecho')"
        id="vientre-derecho"
        v-b-tooltip.hover title="Vientre Derecho"
        d="M12.045985,34.707615l-1.81341-1.36479-.15748,1.83347-1.28568,2.37432l1.98045,2.73595l1.03109.16554.37119-3.88721Z"/>
      <path
        v-if="showPartsMerged['vientre']"
        @click="$emit('click','vientre')"
        :style="getStyle('vientre')"
        id="vientre"
        v-b-tooltip.hover title="Vientre"
        d="M15.636055,44.919735l-.60647-5.91209-.015-3.84879-2.18479-1.07533-.24746,7.03017Zm.41581-.00057l.60628-5.91209.0154-3.84915l2.18404-1.07515.24746,7.03017Z"/>
      <path
        v-if="showPartsMerged['costillas-derechas']"
        @click="$emit('click','costillas-derechas')"
        :style="getStyle('costillas-derechas')"
        id="costillas-derechas"
        v-b-tooltip.hover title="Costillas Derechas"
        d="M12.399365,26.152365l3.11202-1.40603-.0937,2.27965-2.80138,1.4364Zm-1.93508,1.6685l1.29355.72139-.14997-1.70899Zm1.05303-1.637l-2.47931-1.03259.93361,2.52148Zm-1.53164,1.73729l1.69005,1.03372.28871,2.06743-1.64881-1.07515Zm2.91142,1.10421l.0623,1.62387l2.30327-.49961.12448-2.21703Zm.15561,2.40432l-.0309,1.99844l2.20973.59353.0311-3.1227Zm-2.6546-.98516l1.48384,1.0339.20622,2.10905-1.64975-1.32355Z"/>
      <path
        v-if="showPartsMerged['muslo-izquierdo']"
        @click="$emit('click','muslo-izquierdo')"
        :style="getStyle('muslo-izquierdo')"
        id="muslo-izquierdo"
        v-b-tooltip.hover title="Muslo Izquierdo"
        d="M23.419015,50.399125l-.15504,4.75091-2.40263,6.60949.7362,1.90021l2.36401-8.34435Zm-.58154-11.60825l-.15485,4.00722l1.31793,7.93154.61977-6.40308Zm-.38731,5.12268l-2.75152,6.07258-.62015,4.87425l1.16232,6.85771l2.51886-6.98144.15504-7.18764Z"/>
      <path
        v-if="showPartsMerged['interior-muslo-izquierdo']"
        @click="$emit('click','interior-muslo-izquierdo')"
        :style="getStyle('interior-muslo-izquierdo')"
        id="interior-muslo-izquierdo"
        v-b-tooltip.hover title="Anterior Muslo Izquierdo"
        d="M22.063225,39.369605v4.21363l-2.94574,5.82511-1.86027,5.78349.19365-4.0072Zm-3.24944,13.42596l-.0649.15467-1.21294,2.90207.78325,7.18803l1.23619-.66122-1.0714-6.69272Z"/>
      <path
        v-if="showPartsMerged['pie-izquierdo']"
        @click="$emit('click','pie-izquierdo')"
        :style="getStyle('pie-izquierdo')"
        id="pie-izquierdo"
        v-b-tooltip.hover title="Pie Izquierdo"
        d="M17.255895,87.868445l.1243,3.45228.28983,1.20638h.87136l.24897-.83181.29058-.0416-.0624.83181l1.09914-.33332.29058-.16629l1.24444-.27033.0416-.97748-1.20319-2.03743-.82974-1.0399-2.03294-.83181Z"/>
      <path
        v-if="showPartsMerged['pantorrilla-izquierda']"
        @click="$emit('click','pantorrilla-izquierda')"
        :style="getStyle('pantorrilla-izquierda')"
        id="pantorrilla-izquierda"
        v-b-tooltip.hover title="Pantorrilla Izquierda"
        d="M18.251375,70.441125l.29058.91486.6224,3.8681.0829,5.15733-.87136,5.03304.0412-6.44714-.91242-2.57848-.12561-2.82837Zm1.9915,2.32915l-.20753,7.73637-1.65949,6.23904l1.80478-.853l3.00816-10.83583-1.03727-6.82095Z"/>
      <path
        v-if="showPartsMerged['rodilla-izquierda']"
        @click="$emit('click','rodilla-izquierda')"
        :style="getStyle('rodilla-izquierda')"
        id="rodilla-izquierda"
        v-b-tooltip.hover title="Rodilla Izquierda"
        d="M21.404635,64.784375l.1243,1.12295-.87118,1.08171-.29058,1.70599-.58116.24933-.49774-2.57866-.33182-.91486.29058-.58247Zm-3.85853.0832l.6224,1.74685l1.3273,2.57867-.33182,2.37095-.95423-2.66209-.78738-1.49734Zm4.97811-2.37039l-.95423,5.11609.62241-.33295.49773,1.66381Z"/>
      <path
        v-if="showPartsMerged['muslo-derecho']"
        @click="$emit('click','muslo-derecho')"
        :style="getStyle('muslo-derecho')"
        id="muslo-derecho"
        v-b-tooltip.hover title="Muslo Derecho"
        d="M8.269465,50.399125l.15504,4.75053l2.40263,6.60968-.73638,1.90021-2.36401-8.34435Zm.58117-11.60768l.15503,4.00684-1.31754,7.93154-.61978-6.40308Zm.38769,5.1223l2.75151,6.07239.61997,4.87425-1.16232,6.85771-2.51905-6.98163-.15504-7.18801Z"/>
      <path
        v-if="showPartsMerged['pelvis']"
        @click="$emit('click','pelvis')"
        :style="getStyle('pelvis')"
        id="pelvis"
        v-b-tooltip.hover title="Pelvis"
        d="M14.404465,45.040075l.0221-.0277-.14866-.37945c-.11544-1.156199-1.658982-2.86177-3.10172-3.40449l-.23283-.0825l2.05918,5.32009Zm-1.17263,2.01833l1.27705,3.29948.75375-4.04843.24875-1.209159Zm4.05219-2.01795l-.0221-.0281.14867-.37926c.027916-1.208183,1.843112-2.646087,3.10171-3.40449l.23246-.0825-2.05843,5.3199Zm1.17263,2.01795l-1.27706,3.29948-.72281-4.13345-.15573-1.12414Z"/>
      <path
        v-if="showPartsMerged['interior-muslo-derecho']"
        @click="$emit('click','interior-muslo-derecho')"
        :style="getStyle('interior-muslo-derecho')"
        id="interior-muslo-derecho"
        v-b-tooltip.hover title="Interior Muslo Derecho"
        d="M9.625825,39.369415v4.21363l2.94517,5.8253l1.86028,5.78349-.19366-4.0072Zm3.24887,13.42559l.0647.15485l1.21294,2.90207-.78307,7.18803-1.23618-.66102l1.0714-6.69273Z"/>
      <path
        v-if="showPartsMerged['pie-derecho']"
        @click="$emit('click','pie-derecho')"
        :style="getStyle('pie-derecho')"
        id="pie-derecho"
        v-b-tooltip.hover title="Pie Derecho"
        d="M14.433335,87.868265l-.12448,3.45228-.29058,1.20637h-.87118l-.24877-.83181-.29059-.0416.0623.83181-1.09934-.33333-.29058-.16629-1.2448-.27033-.0412-.97747l1.20319-2.03781.82975-1.04009l2.03294-.83181Z"/>
      <path
        v-if="showPartsMerged['pantorrilla-derecha']"
        @click="$emit('click','pantorrilla-derecha')"
        :style="getStyle('pantorrilla-derecha')"
        id="pantorrilla-derecha"
        v-b-tooltip.hover title="Pantorrilla Derecha"
        d="M13.437675,70.440945l-.29058.91486-.62241,3.86828-.0829,5.15733.87174,5.03304-.0418-6.44714.91298-2.57848.1243-2.82837Zm-1.99151,2.32914l.20735,7.73637l1.65968,6.23904-1.80497-.85299-3.00798-10.83584l1.03728-6.82095Z"/>
      <path
        v-if="showPartsMerged['rodilla-derecha']"
        @click="$emit('click','rodilla-derecha')"
        :style="getStyle('rodilla-derecha')"
        id="rodilla-derecha"
        v-b-tooltip.hover title="Rodilla Derecha"
        d="M10.284405,64.784375l-.12448,1.12295.87118,1.08171.29058,1.70599.58116.24933.49774-2.57866.33182-.91486-.29058-.58247Zm3.85854.0832l-.62241,1.74685-1.32767,2.57867.33182,2.37095.95423-2.66209.78832-1.4964Zm-4.97868-2.37058l.95423,5.11609-.6224-.33313-.49793,1.6638Z"/>
      <path
        v-if="showPartsMerged['codo-derecho']"
        @click="$emit('click','codo-derecho')"
        :style="getStyle('codo-derecho')"
        id="codo-derecho"
        v-b-tooltip.hover title="Codo Derecho"
        d="M3.205475,27.370125l.005,3.09419-.57959,1.91184-.54539-2.41185Z"/>
      <path
        v-if="showPartsMerged['mano-derecha']"
        @click="$emit('click','mano-derecha')"
        :style="getStyle('mano-derecha')"
        id="mano-derecha"
        v-b-tooltip.hover title="Mano Derecha"
        d="M4.390445,43.563145l-1.5198.0506-.76631-.67112-1.21262,2.15767-.86245,3.32873.49386.22113.59815-2.20238.50016.25356-.35639,2.49422.62382.24345.41402-2.49194.55839.17851-.2262,2.76603.76938.32268.25788-2.86764.4578-.0181.16611,2.65239.65997.2633.0712-4.56643.34158-.19428l1.35316,1.68367.32832-.34354-.72644-2.0551Z"/>
      <path
        v-if="showPartsMerged['codo-izquierdo']"
        @click="$emit('click','codo-izquierdo')"
        :style="getStyle('codo-izquierdo')"
        id="codo-izquierdo"
        v-b-tooltip.hover title="Codo Izquierdo"
        d="M28.325215,27.370125l-.005,3.09419.57959,1.91184.54538-2.41185Z"/>
      <path
        v-if="showPartsMerged['sacro']"
        @click="$emit('click','sacro')"
        :style="getStyle('sacro')"
        id="sacro"
        v-b-tooltip.hover title="Sacro"
        d="M28.31203,27.274423l-2.22595,3.05869l2.22595,3.117885l1.97837-3.02787Z"
        transform="translate(24.409455 15.199157)"/>
      <path
        v-if="showPartsMerged['mano-izquierda']"
        @click="$emit('click','mano-izquierda')"
        :style="getStyle('mano-izquierda')"
        id="mano-izquierda"
        v-b-tooltip.hover title="Mano Izquierda"
        d="M27.140245,43.563145l1.5198.0506.76631-.67111l1.21262,2.15766.86245,3.32873-.49386.22113-.59815-2.20238-.50016.25356.35639,2.49422-.62382.24345-.41402-2.49194-.55839.17851.2262,2.76603-.76938.32268-.25788-2.86764-.4578-.0181-.16611,2.6524-.65997.26329-.0712-4.56643-.34158-.19428-1.35316,1.68368-.32832-.34355.72644-2.0551Z"/>
      <path
        v-if="showPartsMerged['brazo-izquierdo-posterior']"
        @click="$emit('click','brazo-izquierdo-posterior')"
        :style="getStyle('brazo-izquierdo-posterior')"
        id="brazo-izquierdo-posterior"
        v-b-tooltip.hover title="Brazo Izquierdo Posterior"
        d="M43.185645,27.069445l.4297-1.4164l1.30458-1.68577-1.39393-2.96155-2.28367.92162-1.83567,1.7467-.53524,1.78673.27068,4.30806Zm-2.46869,15.35539l-1.5182.0863-.78184-.65295-1.16168,2.1855-.78414,3.34805.49892.20949.54632-2.2158.50597.24175-.29779,2.5019.62936.22875.35546-2.50096.56242.16536-.16126,2.77057.77674.30455.19056-2.87291.45724-.0289.22827,2.64778.66597.24774-.0359-4.56685.33693-.20224l1.39227,1.65147.32017-.35115-.77444-2.03749Zm-.97726-.17765l-1.43509-.746-.30622-7.00985c0,0,.64359-2.77938.63694-3.06274l.6093-1.21924l3.62552-2.56583-.68276,1.9919.41561,4.74788-1.80402,7.69727Z"/>
      <path
        v-if="showPartsMerged['pierna-izquierda-posterior']"
        @click="$emit('click','pierna-izquierda-posterior')"
        :style="getStyle('pierna-izquierda-posterior')"
        id="pierna-izquierda-posterior"
        v-b-tooltip.hover title="Pierna Izquierda Posterior"
        d="M51.176145,64.073985l-1.20605,3.01461.70738.26558.89754,3.51771-.55801-4.01191Zm-5.08496-3.15003l.63355,1.8609.16813,2.03261.61314,1.93117-.90585-.0851-.28534,2.15982Zm4.3014,6.58834l1.27664,4.99697-.28984,3.02284-.67869,10.06546-1.66325.63506-3.50399-11.96959l1.24985-7.17525Zm.54053,20.8287l.85194,1.3581.37189.79238-.15588,1.21774-.76984.74446-1.51185.12543-1.1299-.29192-.24225-.95894.80765-1.30405-.22562-.85987.29679-.84153-.0194-1.81524l1.53568-.54817Zm-1.19598.4675l.15943,1.25776-.6023.97431m-.54436.29544l1.06474.40084l1.55326-.65137m-4.19331-39.53466l4.55099-2.03879.63802.23079.0353,1.80672.075,4.64669-1.97837,6.04282.47612,1.41403-1.42812,3.29446-1.76611-.30111-.50079-2.11605-.1695-1.75674-2.42102-8.15763-.34279-3.64687Z"/>
      <path
        v-if="showPartsMerged['gluteo-izquierdo']"
        @click="$emit('click','gluteo-izquierdo')"
        :style="getStyle('gluteo-izquierdo')"
        id="gluteo-izquierdo"
        v-b-tooltip.hover title="Glúteo Izquierdo"
        d="M52.393784,42.612615l-2.466385,3.05869l2.30237,3.35979-.2714.11324-.11441.05438h-.1016l-.15011.08012-4.415524,1.77666-2.77023-.51478-.95181-6.15325.36754-2.7864.92062-1.91203l5.48374,1.86457"
        transform="translate(.042696-.18778)"/>

      <path d="" transform="translate(.042696-.18778)"/>

      <path
        v-if="showPartsMerged['gluteo-derecho']"
        @click="$emit('click','gluteo-derecho')"
        :style="getStyle('gluteo-derecho')"
        id="gluteo-derecho"
        v-b-tooltip.hover title="Glúteo Derecho"
        d="M51.839557,49.05515l-2.12045,1.19623-1.606062.632113-2.843238,1.095237-1.330482-4.380899-.1171-5.996766.1171-.623352l3.536922-.043576c1.49161.559713,3.37349,1.350293,4.27033,1.753053v-.05052v0v.05052l-2.02747,3.30927"
        transform="matrix(-1 0 0-1 104.869042 91.52873)"/>
      <path
        v-if="showPartsMerged['lumbar-derecho']"
        @click="$emit('click','lumbar-derecho')"
        :style="getStyle('lumbar-derecho')"
        id="lumbar-derecho"
        v-b-tooltip.hover title="Lumbar Derecho"
        d="M53.122465,40.258395l1.00706-5.028335l1.47341-.61974l2.26689-1.0468l1.729964,5.40131-4.718014,1.852515-2.33301,1.2158"
        transform="translate(-.000554 0.042245)"/>
      <path
        v-if="showPartsMerged['lumbar-izquierdo']"
        @click="$emit('click','lumbar-izquierdo')"
        :style="getStyle('lumbar-izquierdo')"
        id="lumbar-izquierdo"
        v-b-tooltip.hover title="Lumbar Izquierdo"
        d="M52.548765,42.033145l-2.37536-1.2333L44.920479,38.9654l1.86338-5.40188l4.14981,1.55216l1.028956,5.166815"
        transform="translate(-.000554 0.042245)"/>
      <path
        v-if="showPartsMerged['columna']"
        @click="$emit('click','columna')"
        :style="getStyle('columna')"
        id="columna"
        v-b-tooltip.hover title="Columna"
        d="M51.733705,14.788555l.53876,25.33066.48967-.0297.65658-25.3387-.28147-.84188-1.25059-.00049Z"/>
      <path
        v-if="showPartsMerged['cabeza-posterior']"
        @click="$emit('click','cabeza-posterior')"
        :style="getStyle('cabeza-posterior')"
        id="cabeza-posterior"
        v-b-tooltip.hover title="Cabeza Posterior"
        d="M48.157455,6.358545l.44208-.14964.16111.16427l1.48163,4.04751l2.32401,1.45118l2.39971-1.52387.97577-3.68969.52752-.55908.23367.0981.24198-3.34467-2.03129-2.31103-2.84509-.51629-2.20422.52915-1.93631,2.63077Z"/>
      <path
        v-if="showPartsMerged['nuca']"
        @click="$emit('click','nuca')"
        :style="getStyle('nuca')"
        id="nuca"
        v-b-tooltip.hover title="Nuca"
        d="M52.369695,12.105075l-2.35767-1.55045-1.47119-3.95143-.60741.0403.27409,1.82447.97635.33932.7613,2.21572.33017,1.06849.0895,2.14894l1.16448.008.10563-.70833.54716-.0606Zm1.01793,1.47595l.23768.64982l1.38107-.004.01-2.38784.25971-.79061.57215-2.1698.76359-.41018.25158-1.78416-.62859.0193-1.08488,3.89981-2.39725,1.46684.2768,1.48507Z"/>
      <path
        v-if="showPartsMerged['brazo-derecho-posterior']"
        @click="$emit('click','brazo-derecho-posterior')"
        :style="getStyle('brazo-derecho-posterior')"
        id="brazo-derecho-posterior"
        v-b-tooltip.hover title="Brazo Derecho Posterior"
        d="M61.657445,27.250625l-.32785-1.05121-1.27383-2.05489l1.38708-2.96476l2.28579.91634l1.83971,1.74245.53937,1.78549-.26073,4.30868Zm2.64394,15.3417l1.51839.0828.78033-.65476l1.16673,2.18281.79187,3.34623-.49843.21064-.55144-2.21453-.50541.24292.30356,2.5012-.62882.23021-.36124-2.50014-.56203.16666.16765,2.77019-.77603.30634-.19719-2.87245-.45732-.0278-.22215,2.64829-.66539.24928.0254-4.56692-.3374-.20146-1.38845,1.65469-.32098-.35041.76973-2.03928Zm.97685-.1799l1.43335-.74932.29002-7.01054c0,0-.65-2.77789-.64401-3.06126l-.61212-1.21783-3.98124-2.57566l1.0222,1.93525-.38967,4.82212l1.8218,7.69308Z"/>
      <path
        v-if="showPartsMerged['pierna-derecha-posterior']"
        @click="$emit('click','pierna-derecha-posterior')"
        :style="getStyle('pierna-derecha-posterior')"
        id="pierna-derecha-posterior"
        v-b-tooltip.hover title="Pierna Derecha Posterior"
        d="M54.019305,64.073985l1.20605,3.01461-.70737.26558-.89755,3.51771.55802-4.01191Zm5.08496-3.15003l-.63355,1.8609-.16813,2.03261-.61313,1.93117.90584-.0851.28534,2.15982Zm-4.3014,6.58834l-1.27664,4.99697.28984,3.02284.67869,10.06546l1.66325.63506l3.504-11.96959-1.24986-7.17525Zm-.54053,20.8287l-.85194,1.3581-.37189.79238.15589,1.21774.76983.74446l1.51186.12543l1.12989-.29192.24225-.95894-.80765-1.30405.22563-.85987-.29679-.84153.0194-1.81524-1.53568-.54817Zm1.19598.4675l-.15943,1.25776.6023.97431m.54436.29544l-1.06474.40084-1.55326-.65137m3.56525-39.90247l-3.97962-1.70224-.56389.27131-.0528,1.79746-.075,4.64669l1.97837,6.04282-.47612,1.41403l1.42813,3.29446l1.7661-.30111.50079-2.11605.1695-1.75674l2.42102-8.15763.009-3.68308Z"/>
      <path
        v-if="showPartsMerged['dorsal-derecho']"
        @click="$emit('click','dorsal-derecho')"
        :style="getStyle('dorsal-derecho')"
        id="dorsal-derecho"
        v-b-tooltip.hover title="Dorsal Derecho"
        d="M62.863315,16.685695l1.57473,1.56518.81404,2.06904.0384,2.52859-1.48921-1.23926-2.76223-1.15539-1.84691,3.4342-1.13679,5.49715-.13659,3.58392-3.95453,1.58606.04731-6.14228l1.94107-4.90021l5.04395-8.19335Z"/>
      <path
        v-if="showPartsMerged['clavicula-derecha-posterior']"
        @click="$emit('click','clavicula-derecha-posterior')"
        :style="getStyle('clavicula-derecha-posterior')"
        id="clavicula-derecha-posterior"
        v-b-tooltip.hover title="Clavícula Derecha"
        d="M55.439085,14.728535l-.063-2.62463.71441,1.15181l4.37994,1.49796-4.97857,8.36746-1.83043,5.08189.21949-13.55362Z"/>
      <path
        v-if="showPartsMerged['dorsal-izquierdo']"
        @click="$emit('click','dorsal-izquierdo')"
        :style="getStyle('dorsal-izquierdo')"
        id="dorsal-izquierdo"
        v-b-tooltip.hover title="Dorsal Izquierdo"
        d="M42.200945,16.586495l-1.57473,1.56517-.81404,2.06905-.38603,2.52859l1.83679-1.23927l2.76223-1.15538l1.84691,3.4342l1.13679,5.49715.09827,3.68312l3.86452,1.58606.08102-6.24148-1.94107-4.90022-5.04395-8.19334Z"/>
      <path
        v-if="showPartsMerged['clavicula-izquierda-posterior']"
        @click="$emit('click','clavicula-izquierda-posterior')"
        :style="getStyle('clavicula-izquierda-posterior')"
        id="clavicula-izquierda-posterior"
        v-b-tooltip.hover title="Clavícula Izquierda"
        d="M49.625175,14.629325l.063-2.62462-.71441,1.15181-4.37994,1.49796l4.97857,8.36746l1.83043,5.08188-.21949-13.55362Z"/>
    </svg>
  </div>

</template>

<script>

export default /*#__PURE__*/{
  name: 'VueBodyPartSelector', // vue component name
  data() {
    return {
      selection: []
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    bodyColour: {
      type: String,
      default: '#000'
    },
    selectionColour: {
      type: String,
      default: '#000'
    },
    showParts: {
      type: Object,
      default: () => {
        return {
          'head': true,
          'rostro': true,
          'cuello': true,
          'hombro-izquierdo': true,
          'hombro-derecho': true,
          'brazo-izquierdo': true,
          'antebrazo-izquierdo': true,
          'brazo-derecho': true,
          'antebrazo-derecho': true,
          'pecho-izquierdo': true,
          'pecho-derecho': true,
          'vientre-izquierdo': true,
          'costillas-izquierdas': true,
          'vientre-derecho': true,
          'vientre': true,
          'costillas-derechas': true,
          'muslo-izquierdo': true,
          'interior-muslo-izquierdo': true,
          'pie-izquierdo': true,
          'pantorrilla-izquierda': true,
          'rodilla-izquierda': true,
          'muslo-derecho': true,
          'pelvis': true,
          'interior-muslo-derecho': true,
          'pie-derecho': true,
          'pantorrilla-derecha': true,
          'rodilla-derecha': true,
          'codo-derecho': true,
          'mano-derecha': true,
          'codo-izquierdo': true,
          'mano-izquierda': true,
          'brazo-izquierdo-posterior': true,
          'pierna-izquierda-posterior': true,
          'gluteo-derecho': true,
          'gluteo-izquierdo': true,
          'lumbar-derecho': true,
          'lumbar-izquierdo': true,
          'columna': true,
          'cabeza-posterior': true,
          'nuca': true,
          'brazo-derecho-posterior': true,
          'pierna-derecha-posterior': true,
          'dorsal-derecho': true,
          'clavicula-derecha-posterior': true,
          'dorsal-izquierdo': true,
          'clavicula-izquierda-posterior': true,
          'sacro':true
        }
      }
    },
    // TODO:
    // partHoverColour: {
    //   type: String,
    //   default: 'false'
    // },

  },
  computed: {
    showPartsMerged() {
      return {
        'cabeza': true,
        'rostro': true,
        'cuello': true,
        'hombro-izquierdo': true,
        'hombro-derecho': true,
        'brazo-izquierdo': true,
        'antebrazo-izquierdo': true,
        'brazo-derecho': true,
        'antebrazo-derecho': true,
        'pecho-izquierdo': true,
        'pecho-derecho': true,
        'vientre-izquierdo': true,
        'costillas-izquierdas': true,
        'vientre-derecho': true,
        'vientre': true,
        'costillas-derechas': true,
        'muslo-izquierdo': true,
        'interior-muslo-izquierdo': true,
        'pie-izquierdo': true,
        'pantorrilla-izquierda': true,
        'rodilla-izquierda': true,
        'muslo-derecho': true,
        'pelvis': true,
        'interior-muslo-derecho': true,
        'pie-derecho': true,
        'pantorrilla-derecha': true,
        'rodilla-derecha': true,
        'codo-derecho': true,
        'mano-derecha': true,
        'codo-izquierdo': true,
        'mano-izquierda': true,
        'brazo-izquierdo-posterior': true,
        'pierna-izquierda-posterior': true,
        'gluteo-derecho': true,
        'gluteo-izquierdo': true,
        'lumbar-derecho': true,
        'lumbar-izquierdo': true,
        'columna': true,
        'cabeza-posterior': true,
        'nuca': true,
        'brazo-derecho-posterior': true,
        'pierna-derecha-posterior': true,
        'dorsal-derecho': true,
        'clavicula-derecha-posterior': true,
        'dorsal-izquierdo': true,
        'clavicula-izquierda-posterior': true,
        'sacro':true,
        ...this.showParts
      }
    }
  },
  methods: {
    part_clicked(val) {
      let b = val.target.getAttribute('id')
      if (b && !this.disabled) {
        if (this.multiple) {
          if (this.selection.includes(b)) {
            this.selection = this.selection.filter(x => x !== b)
          } else {
            this.selection.push(b)
          }
        } else {
          this.selection = b
        }
      }
    },
    getStyle(partName) {
      let styles = {
        fill: this.bodyColour
      }
      if (this.multiple && this.selection.includes(partName) || this.selection === partName) {
        styles.fill = this.selectionColour
      }
      return styles
    }
  },
  watch: {
    selection(newVal) {
      this.$emit('update:selection', newVal)
    },
    multiple(switchToMult) {
      switchToMult ? this.selection = [] : this.selection = ""
    }
  }
};
</script>

<style scoped>
@media (hover: hover) {

  svg:hover {
    cursor: pointer;
  }

  svg path:hover {
    opacity: 0.8;
  }
}

.noClick {
  pointer-events: none;
}

</style>
