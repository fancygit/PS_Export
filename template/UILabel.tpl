	UILabel *<name> = [[UILabel alloc] initWithFrame:CGRectMake(<x>, <y>, <w>, <h>)];
	<name>.backgroundColor = [UIColor clearColor];
	<name>.text = @"<content>";
	<name>.font = [UIFont boldSystemFontOfSize:<fontsize>.0f];
	[<name> setTextColor:[UIColor colorWithRed:<r> green:<g> blue:<b> alpha:1.0]];
	[<name> setLineBreakMode:NSLineBreakByWordWrapping];  
	<name>.textAlignment = NSTextAlignmentLeft;
	<name>.numberOfLines = <l>;
	[self.baseView addSubview:<name>];

	
