	<cd>UIImageView* <name> = nil;
	<name> = [[UIImageView alloc]init];
	<name>.frame =  CGRectMake(<x>, <y>, <w>, <h>);
	[<name> setImage:[UIImage imageNamed:@"<nm>.png"]];
	[self.baseView addSubview:<name>];
	
