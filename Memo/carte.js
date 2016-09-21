var Gagner     = 0;
var Count      = 0;
var LastCarte  = null;
var ModeDebug  = false;

// 4 valeurs * 2 = 8 Cartes, 5 valeurs * 2 = 10 Cartes etc...
var ArrayCartes = new Array("red", "blue", "green", "black");
var ValueCarte  = ArrayCartes.concat(ArrayCartes);
var NbrValeur   = ValueCarte.length;
var ArrayDonne  = new Array(NbrValeur);
var Tirage      = true;
var Tentative   = 0;
var PairesOk    = 0;

// Temporisateur en secondes
var Tempor      = 1000;

// Retourne toutes les Cartes (Cot� Back)
function InitCarte()
{
  objColTr = document.getElementById('TabCarte').rows;

  for(i=0; i < objColTr.length; i++)
  {
    colTd = objColTr[i].cells
    for(x=0; x < colTd.length; x++)
    {
    	colTd[x].style.backgroundColor = "";
      colTd[x].className = "Back";
    }
  }
  Count = 0;
  document.getElementById('Rejouer').disabled = true;
  Donne();
}

// Tirage Al�atoire des Cartes
function Donne()
{
  var objMSG    = document.getElementById("MSG");
  var objColTr  = document.getElementById('TabCarte').rows;
  var NbrCartes = (objColTr[0].cells.length * objColTr.length);
  var objDebug  = document.getElementById("DivDebug");

  var OK        = true;
  var Buffer    = "";
  var Compteur  = 0;

  // Affiche Masque les infos de debuguage
  objDebug.style.display = (ModeDebug) ? "block" : "none";

  // Le Nbr de Cartes(TD) doit etre egale au Nbr de Valeurs
  // Et doit �tre un Nbr Paire
  if(NbrValeur == NbrCartes)
  {
    while(OK)
    {
      var Tirage = Math.floor(Math.random() * NbrCartes);
      var reg    = new RegExp("#"+Tirage+":", "gi") ;

      if (!reg.test(Buffer))
      {
        ArrayDonne[Compteur] = ValueCarte[Tirage];
        Buffer += "#" + Tirage+ ":";

        // Affiche le Buffer pour Debug Infos
        objMSG.innerHTML = Buffer;
        Compteur ++;
        if(Compteur == NbrCartes) OK = false;
      }
    }
  }
}

// Temporisateur Reset
function ResetChoix(objID, objLast)
{
  objID   = document.getElementById(objID);
  objLast = document.getElementById(objLast);

  // Images Vide
  objID.style.backgroundColor   = "";
  objLast.style.backgroundColor = "";

  // Classe Back
  objID.className   = "Back";
  objLast.className = "Back";
  Tirage            = true;
}

// Click sur une Carte
function Jouer(objID)
{
	// La Carte ne doit pas �tre retourn�e
  if(Tirage && objID.className != "Front")
  {
    Tirage = false;

    if(LastCarte == null)
    {
      objID.className = "Front";
      objID.style.backgroundColor = ArrayDonne[objID.id];
      LastCarte       = objID;
      Tirage          = true;
    }
    else
    {
      if(LastCarte.id != objID.id && objID.className != "Front")
      {
        // Retourne la Carte et Affiche sa Valeur/Image
        objID.className = "Front";
        objID.style.backgroundColor = ArrayDonne[objID.id];

        // Si les deux Cartes sont DIFF�RENTE
        if(ArrayDonne[objID.id] != ArrayDonne[LastCarte.id])
        {
          // Declenche le Temporisateur
          a = setTimeout( "ResetChoix(" + objID.id + ", "+ LastCarte.id + ")", Tempor);
          LastCarte       = null;
        }
        else
        {
          // Les Deux Cartes sont EGALE
          LastCarte       = null;
          Count ++;
          PairesOk ++;
          document.getElementById('paires').innerHTML = PairesOk;

          // Si Tout Gagner (nbr de paires)
          if(Count == (NbrValeur/2))
          {
            Gagner   ++;
            document.getElementById('NbrGagner').innerHTML = Gagner;
            document.getElementById('Rejouer').disabled = false;
          }
          Tirage = true;
        }

        Tentative ++;
        document.getElementById('Try').innerHTML = Tentative;

      }
    }
  }
}

// 1ere Donne des Cartes
window.onload = Donne;
