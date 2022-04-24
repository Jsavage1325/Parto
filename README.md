## Description:
### Smart contracts
1. Reward token: This ERC20 token is minted when there is revenue to be distributed.
2. Super token: This is Superfluid contract that wraps Reward token for easy distribution. The newly minted tokens will be wrapped in Super token and distributed to Song token owners.
3. Brains contract:
This contract checks how many Reward tokens should be distributed at the certain time by communicating with UMA Oracle. It then uses Song token to determine how it should distribute reward tokens, and distributes the tokens. Individual parts of the contract are:
3.1. Instant Distribution Agreement            It distributes Reward tokens to Song tokens owners.
3.2. Song token            ERC20, it represents share in the stream revenues for a particular song.
3.3. UMA Oracle Interface            It asks UMA Oracle if the proposed Reward token quantity is proportional to the number of streams / views / listens.
>>>>>>> 3f2ff1092b21245dfe0498f707ab183d084b56ce


### Backend
IPFS + Piñata

We store song and license information on IPFS. When the Song contract is constructed, we add the IPFS hash in a variable so anyone can use getter to check what rights does this token include. We use Piñata to ensure this information is always available.

### Frontend
Web3Auth
We use Web3Auth to enable users to log in with either their web2 credentials or their Ethereal wallet.

NextJS + Chakra + Typescript
The whole frontend is built in these tools.

### Design
Polygon Finity Design System
Figma

## Team
*Albert Corsali*, Frontend and backend
*Antonija Elpeza*, Design
*Jeremy Savage*, Smart contracts
*Samuel Pink*, Smart contracts
*Tomislav Mamić*, Product management
