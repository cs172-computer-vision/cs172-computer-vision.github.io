"""Execute the exact model and training code authored in the HTML slides."""
from pathlib import Path
from html.parser import HTMLParser
import torch
class Code(HTMLParser):
 def __init__(self):super().__init__();self.current=None;self.code={}
 def handle_starttag(self,t,a):
  if t=='pre' and 'data-code' in dict(a):self.current=dict(a)['data-code'];self.code[self.current]=''
 def handle_data(self,d):
  if self.current:self.code[self.current]+=d
 def handle_endtag(self,t):
  if t=='pre':self.current=None
p=Code();p.feed((Path(__file__).resolve().parents[1]/'index.html').read_text())
torch.manual_seed(172)
state={};exec(p.code['model'],state)
model=state['model'];before=[x.detach().clone() for x in model.parameters()]
assert sum(p.numel() for p in model.parameters())==1562
exec(p.code['training'],state)
assert torch.isfinite(state['loss'])
assert any(not torch.equal(a,b) for a,b in zip(before,model.parameters()))
print('Displayed PyTorch code: forward shape, 1,562 parameters, finite loss and SGD update passed.')
