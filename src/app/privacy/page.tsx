"use client";

import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/lib/useLang";

const T = {
  IT: {
    title: "Privacy Policy",
    updated: "Ultimo aggiornamento: Aprile 2026",
    sections: [
      { h: "1. Nessun dato raccolto", p: "SolMint non raccoglie, memorizza o elabora dati personali degli utenti. Non esiste alcun database, account utente o sistema di autenticazione. Il sito funziona interamente tramite connessione diretta al tuo wallet Solana." },
      { h: "2. Wallet e transazioni", p: "SolMint non ha mai accesso alle chiavi private del tuo wallet. Tutte le transazioni sono firmate localmente dal tuo wallet (Phantom, Solflare) e trasmesse direttamente alla blockchain Solana. Non conserviamo nessuna informazione sulle transazioni effettuate." },
      { h: "3. IPFS e metadata", p: "Le immagini e i metadata dei token vengono caricati su IPFS tramite Pinata. Questi dati sono pubblici e immutabili per natura della tecnologia blockchain. Non caricare informazioni personali nei metadata del token." },
      { h: "4. Cookie e analytics", p: "SolMint non utilizza cookie di profilazione, tracker o sistemi di analytics di terze parti. Non viene installato nessun cookie sul tuo browser." },
      { h: "5. Servizi terzi", p: "Il sito si interfaccia con Solana blockchain, Pinata (IPFS), QuickNode (RPC) e Raydium (DEX). Questi servizi hanno le proprie privacy policy indipendenti." },
    ],
  },
  EN: {
    title: "Privacy Policy",
    updated: "Last updated: April 2026",
    sections: [
      { h: "1. No data collected", p: "SolMint does not collect, store or process personal data of users. There is no database, user account or authentication system. The site operates entirely through a direct connection to your Solana wallet." },
      { h: "2. Wallet and transactions", p: "SolMint never has access to your wallet's private keys. All transactions are signed locally by your wallet (Phantom, Solflare) and transmitted directly to the Solana blockchain. We do not store any information about completed transactions." },
      { h: "3. IPFS and metadata", p: "Token images and metadata are uploaded to IPFS via Pinata. This data is public and immutable by nature of blockchain technology. Do not upload personal information in the token metadata." },
      { h: "4. Cookies and analytics", p: "SolMint does not use profiling cookies, trackers or third-party analytics systems. No cookies are installed on your browser." },
      { h: "5. Third-party services", p: "The site interfaces with Solana blockchain, Pinata (IPFS), QuickNode (RPC) and Raydium (DEX). These services have their own independent privacy policies." },
    ],
  },
  ES: {
    title: "Política de Privacidad",
    updated: "Última actualización: Abril 2026",
    sections: [
      { h: "1. Sin datos recopilados", p: "SolMint no recopila, almacena ni procesa datos personales de los usuarios. No existe ninguna base de datos, cuenta de usuario ni sistema de autenticación. El sitio funciona íntegramente mediante conexión directa a tu wallet de Solana." },
      { h: "2. Wallet y transacciones", p: "SolMint nunca tiene acceso a las claves privadas de tu wallet. Todas las transacciones son firmadas localmente por tu wallet (Phantom, Solflare) y transmitidas directamente a la blockchain de Solana. No almacenamos ninguna información sobre las transacciones realizadas." },
      { h: "3. IPFS y metadatos", p: "Las imágenes y metadatos de los tokens se suben a IPFS a través de Pinata. Estos datos son públicos e inmutables por naturaleza de la tecnología blockchain. No subas información personal en los metadatos del token." },
      { h: "4. Cookies y análisis", p: "SolMint no utiliza cookies de perfilado, rastreadores ni sistemas de análisis de terceros. No se instala ninguna cookie en tu navegador." },
      { h: "5. Servicios de terceros", p: "El sitio interactúa con la blockchain de Solana, Pinata (IPFS), QuickNode (RPC) y Raydium (DEX). Estos servicios tienen sus propias políticas de privacidad independientes." },
    ],
  },
  FR: {
    title: "Politique de Confidentialité",
    updated: "Dernière mise à jour : Avril 2026",
    sections: [
      { h: "1. Aucune donnée collectée", p: "SolMint ne collecte, ne stocke ni ne traite les données personnelles des utilisateurs. Il n'existe aucune base de données, compte utilisateur ou système d'authentification. Le site fonctionne entièrement via une connexion directe à votre portefeuille Solana." },
      { h: "2. Portefeuille et transactions", p: "SolMint n'a jamais accès aux clés privées de votre portefeuille. Toutes les transactions sont signées localement par votre portefeuille (Phantom, Solflare) et transmises directement à la blockchain Solana. Nous ne conservons aucune information sur les transactions effectuées." },
      { h: "3. IPFS et métadonnées", p: "Les images et métadonnées des tokens sont téléchargées sur IPFS via Pinata. Ces données sont publiques et immuables par nature de la technologie blockchain. Ne téléchargez pas d'informations personnelles dans les métadonnées du token." },
      { h: "4. Cookies et analyses", p: "SolMint n'utilise pas de cookies de profilage, de traceurs ou de systèmes d'analyse tiers. Aucun cookie n'est installé sur votre navigateur." },
      { h: "5. Services tiers", p: "Le site interagit avec la blockchain Solana, Pinata (IPFS), QuickNode (RPC) et Raydium (DEX). Ces services ont leurs propres politiques de confidentialité indépendantes." },
    ],
  },
  PT: {
    title: "Política de Privacidade",
    updated: "Última atualização: Abril de 2026",
    sections: [
      { h: "1. Nenhum dado coletado", p: "SolMint não coleta, armazena nem processa dados pessoais dos usuários. Não existe banco de dados, conta de usuário ou sistema de autenticação. O site funciona inteiramente através de conexão direta à sua carteira Solana." },
      { h: "2. Carteira e transações", p: "SolMint nunca tem acesso às chaves privadas da sua carteira. Todas as transações são assinadas localmente pela sua carteira (Phantom, Solflare) e transmitidas diretamente para a blockchain Solana. Não armazenamos nenhuma informação sobre transações realizadas." },
      { h: "3. IPFS e metadados", p: "As imagens e metadados dos tokens são carregados no IPFS via Pinata. Esses dados são públicos e imutáveis pela natureza da tecnologia blockchain. Não carregue informações pessoais nos metadados do token." },
      { h: "4. Cookies e análises", p: "SolMint não utiliza cookies de perfil, rastreadores ou sistemas de análise de terceiros. Nenhum cookie é instalado no seu navegador." },
      { h: "5. Serviços de terceiros", p: "O site se conecta à blockchain Solana, Pinata (IPFS), QuickNode (RPC) e Raydium (DEX). Esses serviços têm suas próprias políticas de privacidade independentes." },
    ],
  },
  DE: {
    title: "Datenschutzerklärung",
    updated: "Letzte Aktualisierung: April 2026",
    sections: [
      { h: "1. Keine Daten gesammelt", p: "SolMint erfasst, speichert oder verarbeitet keine personenbezogenen Daten der Nutzer. Es gibt keine Datenbank, keine Nutzerkonten und kein Authentifizierungssystem. Die Website funktioniert vollständig über eine direkte Verbindung zu deiner Solana-Wallet." },
      { h: "2. Wallet und Transaktionen", p: "SolMint hat niemals Zugang zu den privaten Schlüsseln deiner Wallet. Alle Transaktionen werden lokal von deiner Wallet (Phantom, Solflare) signiert und direkt an die Solana-Blockchain übertragen. Wir speichern keine Informationen über durchgeführte Transaktionen." },
      { h: "3. IPFS und Metadaten", p: "Token-Bilder und Metadaten werden über Pinata auf IPFS hochgeladen. Diese Daten sind aufgrund der Natur der Blockchain-Technologie öffentlich und unveränderlich. Lade keine persönlichen Informationen in die Token-Metadaten hoch." },
      { h: "4. Cookies und Analysen", p: "SolMint verwendet keine Profiling-Cookies, Tracker oder Drittanbieter-Analysesysteme. Es werden keine Cookies in deinem Browser installiert." },
      { h: "5. Drittanbieterdienste", p: "Die Website interagiert mit der Solana-Blockchain, Pinata (IPFS), QuickNode (RPC) und Raydium (DEX). Diese Dienste haben ihre eigenen unabhängigen Datenschutzrichtlinien." },
    ],
  },
};

export default function Privacy() {
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
