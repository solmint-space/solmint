"use client";

import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/lib/useLang";

const T = {
  IT: {
    title: "Termini e Condizioni",
    updated: "Ultimo aggiornamento: Aprile 2026",
    sections: [
      { h: "1. Accettazione dei termini", p: "Utilizzando SolMint accetti integralmente questi termini. Se non li accetti, non utilizzare il servizio. SolMint è uno strumento tecnico per la creazione di token SPL su Solana." },
      { h: "2. Natura del servizio", p: "SolMint è uno strumento tecnico non-custodial. Non siamo un exchange, non gestiamo fondi e non offriamo consulenza finanziaria. Le fee pagate sono per il servizio tecnico di creazione token e non costituiscono investimento." },
      { h: "3. Responsabilità dell'utente", p: "Sei il solo responsabile dei token che crei tramite SolMint. È vietato creare token con finalità fraudolente, di truffa, pump and dump, o che violino leggi locali. SolMint non è responsabile per l'uso che gli utenti fanno dei token creati." },
      { h: "4. Fee e transazioni", p: "Le fee addebitate sono chiaramente indicate prima di ogni transazione. Tutte le transazioni blockchain sono irreversibili. SolMint non può rimborsare fee già pagate on-chain. Verifica sempre i dettagli prima di firmare con il tuo wallet." },
      { h: "5. Rischi blockchain", p: "Le transazioni su blockchain comportano rischi intrinseci inclusi ma non limitati a: volatilità del prezzo di SOL, congestione della rete, bug nei contratti. Usa SolMint consapevolmente e solo con fondi che puoi permetterti di perdere." },
      { h: "6. Limitazione di responsabilità", p: "SolMint è fornito \"as is\" senza garanzie di alcun tipo. Non siamo responsabili per perdite dirette o indirette derivanti dall'uso del servizio, malfunzionamenti della blockchain Solana o di servizi terzi." },
      { h: "7. Modifiche", p: "Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche saranno effettive dalla data di pubblicazione sul sito." },
    ],
  },
  EN: {
    title: "Terms and Conditions",
    updated: "Last updated: April 2026",
    sections: [
      { h: "1. Acceptance of terms", p: "By using SolMint you fully accept these terms. If you do not accept them, do not use the service. SolMint is a technical tool for creating SPL tokens on Solana." },
      { h: "2. Nature of the service", p: "SolMint is a non-custodial technical tool. We are not an exchange, we do not manage funds and we do not provide financial advice. Fees paid are for the technical token creation service and do not constitute an investment." },
      { h: "3. User responsibility", p: "You are solely responsible for the tokens you create through SolMint. It is forbidden to create tokens for fraudulent purposes, scams, pump and dump, or that violate local laws. SolMint is not responsible for how users use the tokens created." },
      { h: "4. Fees and transactions", p: "Fees charged are clearly indicated before each transaction. All blockchain transactions are irreversible. SolMint cannot refund fees already paid on-chain. Always verify the details before signing with your wallet." },
      { h: "5. Blockchain risks", p: "Blockchain transactions carry inherent risks including but not limited to: SOL price volatility, network congestion, contract bugs. Use SolMint responsibly and only with funds you can afford to lose." },
      { h: "6. Limitation of liability", p: "SolMint is provided \"as is\" without warranties of any kind. We are not responsible for direct or indirect losses arising from the use of the service, malfunctions of the Solana blockchain or third-party services." },
      { h: "7. Changes", p: "We reserve the right to modify these terms at any time. Changes will be effective from the date of publication on the site." },
    ],
  },
  ES: {
    title: "Términos y Condiciones",
    updated: "Última actualización: Abril 2026",
    sections: [
      { h: "1. Aceptación de los términos", p: "Al usar SolMint aceptas íntegramente estos términos. Si no los aceptas, no utilices el servicio. SolMint es una herramienta técnica para la creación de tokens SPL en Solana." },
      { h: "2. Naturaleza del servicio", p: "SolMint es una herramienta técnica no custodial. No somos un exchange, no gestionamos fondos y no ofrecemos asesoramiento financiero. Las tarifas pagadas son por el servicio técnico de creación de tokens y no constituyen una inversión." },
      { h: "3. Responsabilidad del usuario", p: "Eres el único responsable de los tokens que crees a través de SolMint. Está prohibido crear tokens con fines fraudulentos, estafas, pump and dump, o que violen leyes locales. SolMint no es responsable del uso que los usuarios hagan de los tokens creados." },
      { h: "4. Tarifas y transacciones", p: "Las tarifas cobradas se indican claramente antes de cada transacción. Todas las transacciones blockchain son irreversibles. SolMint no puede reembolsar tarifas ya pagadas on-chain. Verifica siempre los detalles antes de firmar con tu wallet." },
      { h: "5. Riesgos de blockchain", p: "Las transacciones en blockchain conllevan riesgos inherentes que incluyen pero no se limitan a: volatilidad del precio de SOL, congestión de la red, bugs en contratos. Usa SolMint con consciencia y solo con fondos que puedas permitirte perder." },
      { h: "6. Limitación de responsabilidad", p: "SolMint se proporciona \"tal cual\" sin garantías de ningún tipo. No somos responsables de pérdidas directas o indirectas derivadas del uso del servicio, fallos de la blockchain de Solana o servicios de terceros." },
      { h: "7. Cambios", p: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde la fecha de publicación en el sitio." },
    ],
  },
  FR: {
    title: "Conditions d'Utilisation",
    updated: "Dernière mise à jour : Avril 2026",
    sections: [
      { h: "1. Acceptation des conditions", p: "En utilisant SolMint, vous acceptez intégralement ces conditions. Si vous ne les acceptez pas, n'utilisez pas le service. SolMint est un outil technique pour la création de tokens SPL sur Solana." },
      { h: "2. Nature du service", p: "SolMint est un outil technique non-custodial. Nous ne sommes pas un exchange, nous ne gérons pas de fonds et nous ne fournissons pas de conseils financiers. Les frais payés sont pour le service technique de création de tokens et ne constituent pas un investissement." },
      { h: "3. Responsabilité de l'utilisateur", p: "Vous êtes seul responsable des tokens que vous créez via SolMint. Il est interdit de créer des tokens à des fins frauduleuses, d'escroquerie, de pump and dump, ou qui violent les lois locales. SolMint n'est pas responsable de la façon dont les utilisateurs utilisent les tokens créés." },
      { h: "4. Frais et transactions", p: "Les frais facturés sont clairement indiqués avant chaque transaction. Toutes les transactions blockchain sont irréversibles. SolMint ne peut pas rembourser les frais déjà payés on-chain. Vérifiez toujours les détails avant de signer avec votre portefeuille." },
      { h: "5. Risques blockchain", p: "Les transactions blockchain comportent des risques inhérents incluant mais non limités à : volatilité du prix du SOL, congestion du réseau, bugs dans les contrats. Utilisez SolMint de manière responsable et uniquement avec des fonds que vous pouvez vous permettre de perdre." },
      { h: "6. Limitation de responsabilité", p: "SolMint est fourni \"tel quel\" sans garanties d'aucune sorte. Nous ne sommes pas responsables des pertes directes ou indirectes résultant de l'utilisation du service, des dysfonctionnements de la blockchain Solana ou de services tiers." },
      { h: "7. Modifications", p: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications seront effectives à compter de la date de publication sur le site." },
    ],
  },
  PT: {
    title: "Termos e Condições",
    updated: "Última atualização: Abril de 2026",
    sections: [
      { h: "1. Aceitação dos termos", p: "Ao usar o SolMint você aceita integralmente estes termos. Se não os aceitar, não use o serviço. SolMint é uma ferramenta técnica para criação de tokens SPL na Solana." },
      { h: "2. Natureza do serviço", p: "SolMint é uma ferramenta técnica não custodial. Não somos uma exchange, não gerenciamos fundos e não oferecemos consultoria financeira. As taxas pagas são pelo serviço técnico de criação de tokens e não constituem investimento." },
      { h: "3. Responsabilidade do usuário", p: "Você é o único responsável pelos tokens que criar através do SolMint. É proibido criar tokens com finalidades fraudulentas, golpes, pump and dump, ou que violem leis locais. SolMint não é responsável pelo uso que os usuários fazem dos tokens criados." },
      { h: "4. Taxas e transações", p: "As taxas cobradas são claramente indicadas antes de cada transação. Todas as transações blockchain são irreversíveis. SolMint não pode reembolsar taxas já pagas on-chain. Sempre verifique os detalhes antes de assinar com sua carteira." },
      { h: "5. Riscos de blockchain", p: "Transações em blockchain carregam riscos inerentes incluindo mas não limitados a: volatilidade do preço de SOL, congestionamento da rede, bugs em contratos. Use o SolMint com consciência e apenas com fundos que você pode se dar ao luxo de perder." },
      { h: "6. Limitação de responsabilidade", p: "SolMint é fornecido \"como está\" sem garantias de qualquer tipo. Não somos responsáveis por perdas diretas ou indiretas decorrentes do uso do serviço, mau funcionamento da blockchain Solana ou serviços de terceiros." },
      { h: "7. Alterações", p: "Reservamos o direito de modificar estes termos a qualquer momento. As alterações serão efetivas a partir da data de publicação no site." },
    ],
  },
  DE: {
    title: "Nutzungsbedingungen",
    updated: "Letzte Aktualisierung: April 2026",
    sections: [
      { h: "1. Akzeptanz der Bedingungen", p: "Durch die Nutzung von SolMint akzeptierst du diese Bedingungen vollständig. Wenn du sie nicht akzeptierst, nutze den Dienst nicht. SolMint ist ein technisches Werkzeug zur Erstellung von SPL-Tokens auf Solana." },
      { h: "2. Art des Dienstes", p: "SolMint ist ein nicht-custodiales technisches Werkzeug. Wir sind keine Exchange, verwalten keine Gelder und bieten keine Finanzberatung an. Die gezahlten Gebühren sind für den technischen Token-Erstellungsservice und stellen keine Investition dar." },
      { h: "3. Nutzerverantwortung", p: "Du bist allein verantwortlich für die Tokens, die du über SolMint erstellst. Es ist verboten, Tokens für betrügerische Zwecke, Betrug, Pump and Dump oder Verstöße gegen lokale Gesetze zu erstellen. SolMint haftet nicht für die Nutzung der erstellten Tokens durch die Nutzer." },
      { h: "4. Gebühren und Transaktionen", p: "Die berechneten Gebühren werden vor jeder Transaktion klar angegeben. Alle Blockchain-Transaktionen sind irreversibel. SolMint kann bereits on-chain gezahlte Gebühren nicht erstatten. Überprüfe immer die Details, bevor du mit deiner Wallet unterschreibst." },
      { h: "5. Blockchain-Risiken", p: "Blockchain-Transaktionen bergen inhärente Risiken, einschließlich aber nicht beschränkt auf: SOL-Preisvolatilität, Netzwerküberlastung, Contract-Bugs. Nutze SolMint verantwortungsbewusst und nur mit Mitteln, die du dir leisten kannst zu verlieren." },
      { h: "6. Haftungsbeschränkung", p: "SolMint wird \"wie besehen\" ohne jegliche Garantien bereitgestellt. Wir haften nicht für direkte oder indirekte Verluste, die aus der Nutzung des Dienstes, Fehlfunktionen der Solana-Blockchain oder Drittanbieterdiensten entstehen." },
      { h: "7. Änderungen", p: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Änderungen werden ab dem Datum der Veröffentlichung auf der Website wirksam." },
    ],
  },
};

export default function Terms() {
  const [lang] = useLang();
  const t = T[lang] ?? T["EN"];

  return (
    <main className="min-h-screen text-white" style={{ background: "#07070f" }}>
      <SiteNavbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-500 text-sm mb-12">{t.updated}</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          {t.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-white mb-3">{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
