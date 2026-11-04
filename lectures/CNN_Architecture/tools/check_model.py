#!/usr/bin/env python3
"""Execute the residual block (stable ID 27-code, current page 26) on synthetic data; no downloads or accuracy claim."""
import torch
from torch import nn
class BasicBlock(nn.Module):
 def __init__(self,cin,cout,stride=1):
  super().__init__()
  self.f=nn.Sequential(
   nn.Conv2d(cin,cout,3,stride,1,bias=False),
   nn.BatchNorm2d(cout),nn.ReLU(),
   nn.Conv2d(cout,cout,3,1,1,bias=False),nn.BatchNorm2d(cout))
  self.skip=nn.Identity() if cin==cout and stride==1 else nn.Sequential(
   nn.Conv2d(cin,cout,1,stride,bias=False),nn.BatchNorm2d(cout))
 def forward(self,x):return torch.relu(self.f(x)+self.skip(x))
torch.manual_seed(172)
for cin,cout,stride in [(64,64,1),(64,128,2),(64,64,2)]:
 block=BasicBlock(cin,cout,stride)
 x=torch.randn(2,cin,56,56,requires_grad=True);y=block(x)
 assert y.shape==(2,cout,56//stride,56//stride)
 y.square().mean().backward()
 assert torch.isfinite(x.grad).all() and x.grad.abs().sum()>0
 expected=9*cin*cout+9*cout*cout+4*cout
 if cin!=cout or stride!=1:expected+=cin*cout+2*cout
 assert sum(p.numel() for p in block.parameters())==expected
 block.eval()
 with torch.no_grad():assert torch.isfinite(block(x)).all()
print('Passed identity and projection shapes, same-channel downsampling, parameter counts, backward gradients, and evaluation forward pass.')
